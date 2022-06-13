import { Dictionary } from "lodash"

/**
 * All supported languages for your website
 */
export type TLang = "en" | "vi"

/**
 * Status of existing users
 */
export type TUserStatus = "activated" | "emailChanged"

/**
 * User's properties
 */
export type TUser = {
	uid: string
	createdAt: string
	updatedAt: string
	Name: string | null
	email: string
	password: string
	status: TUserStatus
}

/**
 * DB_USERS SCHEME NAME
 */
export type TUserProperty = {
	name: "Name"
	| "email"
	| "password"
	| "resetCode"
	| "status"
	value: string
}

export type TQuery = {
	parent?: { database_id: string },
	properties: Dictionary<unknown>
}