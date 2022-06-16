import {
	apiHeaders,
	createPage,
	getEmailValue,
	getPageTitleValue,
	getParagraphPlainText,
	getSelectValue,
	queryDatabase,
	queryEmail,
	queryRichtext,
	querySelect,
	queryTitle,
} from "@bizchain.vn/notion"

import { passwordHash } from "@bizchain.vn/utils"

import { DB_USERS, NOTION_API_KEY } from "~/data/static.server"

import type { TQuery, TUser, TUserProperty, TUserStatus } from "~/types"
import type {
	CreatePageResponse, PropertyValueEmail, PropertyValueRichText, PropertyValueSelect, PropertyValueTitle
} from "@bizchain.vn/notion"

/**
 * An onboarded user whose status is `activated` or `emailChanged` or `blocked`
 * @param user
 * @returns
 */
export function isOnboarded(user: TUser): boolean {
	return (user.status === "activated" || user.status === "emailChanged" || user.status === "disabled")
}

/**
 *
 * @param properties
 * @param isNewUser
 * @returns
 */
export function queryUserBuilder(properties: Array<TUserProperty>, isNewUser: { isNewUser: boolean }) {
	const query: TQuery = {
		properties: {},
	}

	if (isNewUser) query.parent = { database_id: DB_USERS }

	properties.forEach((property) => {
		switch (property.name) {
			case "Name":
				//note: `Name` is with `N` uppercase, this is default in notion
				query.properties.Name = queryTitle(String(property.value))
				break

			case "email":
				query.properties.email = queryEmail(String(property.value))
				break

			case "password":
				query.properties.password = queryRichtext(String(property.value))
				break

			case "status":
				query.properties.status = querySelect(String(property.value))
				break

			case "resetCode":
				query.properties.resetCode = queryRichtext(String(property.value))
				break

			default:
				break
		}
	})

	return query
}

/**
 * Create new user! Note: Activation code is automatically generated
 */

/**
 *
 * @param Name
 * @param email
 * @param password
 * @returns
 */
export async function createNewUser(Name: string, email: string, password: string): Promise<TUser> {
	const hashedPassword = await passwordHash(password)

	const query = queryUserBuilder(
		[
			{ name: "Name", value: Name },
			{ name: "email", value: email },
			{ name: "password", value: hashedPassword },
			{ name: "status", value: "activated" },
		],
		{
			isNewUser: true,
		}
	)

	const createRes = await createPage(
		apiHeaders(NOTION_API_KEY),
		DB_USERS,
		JSON.stringify(query)
	)
	const user = extractUserProperties(createRes)
	return user
}

export function extractUserProperties(user: CreatePageResponse): TUser {
	return {
		uid: user.id,
		createdAt: user.created_time,
		updatedAt: user.last_edited_time,
		//`.Name` with `N` uppercase
		Name: getPageTitleValue(user.properties.Name as PropertyValueTitle),
		email: getEmailValue(user.properties.email as PropertyValueEmail),
		password: getParagraphPlainText(
			user.properties.password as PropertyValueRichText
		),
		status: (getSelectValue(user.properties._status as PropertyValueSelect) ??
			"activated") as TUserStatus,
	}
}

/**
 * Get a single user
 * @param {string} email
 * @returns
 */
export async function getUser(email: string): Promise<TUser | null> {
	const queryStr = JSON.stringify({
		filter: {
			property: "email",
			email: { equals: email },
		},
	})
	const queryRes = await queryDatabase(
		apiHeaders(NOTION_API_KEY),
		DB_USERS,
		queryStr
	)

	if (queryRes.results.length === 0) return null

	const user = extractUserProperties(queryRes.results[0])
	return user
}

/**
 * Get all users
 * @returns Array<TUser>
 */
export async function getAllUsers(): Promise<TUser[]> {
	const queryRes = await queryDatabase(apiHeaders(NOTION_API_KEY), DB_USERS)
	const users = queryRes.results.map((user) => extractUserProperties(user))
	return users
}

/**
 * @param email
 * @param password
 * @returns TUser | boolean
 */
export async function isValidLogin(email: string, password: string): Promise<TUser | null> {

	console.log({email, password})

	const queryStr = JSON.stringify({
		filter: {
			and: [
				{
					property: "email",
					email: { equals: email },
				},
				{
					property: "password",
					rich_text: { equals: password },
				},
			],
		},
	})

	const queryRes = await queryDatabase(
		apiHeaders(NOTION_API_KEY),
		DB_USERS,
		queryStr
	)

	if (queryRes.results.length === 0) return null

	const user = extractUserProperties(queryRes.results[0])
	return user
}
