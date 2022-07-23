import { Dictionary } from "lodash"

/**
 * All supported languages for your website
 */
export type Language = "en" | "vi"

/**
 * Status of existing users
 */
export type UserStatus = "activated" | "emailChanged" | "disabled"

/**
 * User's properties
 */
export type User = {
	uid: string
	createdAt: string
	updatedAt: string
	Name: string | null
	email: string
	password: string
	status: UserStatus
}

/**
 * DB_USERS SCHEME NAME
 */
export type UserProperty = {
	name:
	| "Name"
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

export type TBreadcrumbs = {
	title: string,
	url?: string,
	icon?: string
}

/************************************************************************************************
 * 
 * 		TYPES FOR MENUS
 * 
 ************************************************************************************************/

export type TSidebarItemSpacing =
	| "border-top"
	| "border-bottom"
	| "padding-top"
	| "padding-bottom"
	| "all"

export type TMenuItem = {
	menuItemId: string,
	title: string
	slug: string
	description?: string
	/**
	 * whether the `slug` is external or not
	 * if external => render `<a>` tag
	 * else, render `<Link>` component
	 */
	external?: boolean
	icon?: string
	lessImportant?: boolean
	/**
	 * optional data for any other purpose
	 */
	meta?: TSidebarItemSpacing
}

export type TSidebarMenuItem = TMenuItem & {
	children?: TMenuItem[]
}

export type TFooterMenuItem = {
	title: string
	children: TMenuItem[]
}

export type MarkdownText = string

export type SupportedSocialIcon =
	| "none"
	| "website"
	//
	| "facebook"
	| "twitter"
	| "instagram"
	| "tiktok"
	| "youtube"
	| "linkedin"
	| "flickr"
	//
	| "github"
	| "hashnode"
	//
	| "zalo"

export type IconProps = {
	url: string
	name: SupportedSocialIcon
}