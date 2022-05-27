import type { Dictionary } from "lodash"

export type QueryType = {
	parent?: { database_id: string },
	properties: Dictionary<unknown>
}

export type TSupportedBlock = "paragraph"

/************************************************************************************************
 * 
 * 	AUTHENTICATION
 * 
 ************************************************************************************************/

export type TLogin =
	| "strategyEmailPassword"
	| "strategyGoogle"
	| "strategyGithub"
	| "strategyFacebook"
	| "strategyZalo"
	| "strategyTwitter"

/************************************************************************************************
 *
 *  	USER
 * 
 ************************************************************************************************/

export type TDBError = {
	object: string
	status: number
	code: string
	message: string
}

export type TUserStatus =
	| "activated"
	| "onboarding"
	| "archived"
	| "emailChanged"

export type TUserGender =
	| "unknown"
	| "male"
	| "female"

/**
 * `TUserProperties` is DB_USERS SCHEME NAME
 */
export type TUserProperty = {
	name: "Name"
	| "email"
	| "password"
	| "_activateOrReset"
	| "_address"
	| "_birthday"
	| "_companyName"
	| "_country"
	| "_email"
	| "_expiredReminder"
	| "_firstName"
	| "_gender"
	| "_idNumber"
	| "_lastName"
	| "_loginType"
	| "_newsletter"
	| "_province"
	| "_representative"
	| "_status"
	| "_taxcode"
	| "_telephone"
	value: string | number | boolean
}

/**
 * User's data (an extend of TUserProperties)
 */
export type TUser = {
	uid: string
	createdAt: string
	updatedAt: string
	//
	Name: string | null
	email: string
	password: string
	_activateOrReset: string | null
	_address: string | null
	_birthday: string | null
	_companyName: string | null
	_country: string | null
	_email: string | null
	_expiredReminder: boolean
	_firstName: string | null
	_gender: TUserGender
	_idNumber: string | null
	_lastName: string | null
	_loginType: TLogin
	_newsletter: boolean
	_province: string | null
	_representative: string | null
	_status: TUserStatus
	_taxcode: string | null
	_telephone: string | null
} | null

/************************************************************************************************
 *
 *  	TICKETS
 * 
 ************************************************************************************************/

/**
 * `TTicketProperties` is DB_TICKETS SCHEME NAME
 */
export type TTicketProperty = {
	name:
		| "Name"
		| "userNote"
		| "category"
		| "relatedProduct"
		| "adminNote"
		| "priority"
		| "status"
		| "content"
		| "token"
		| "uid"
		| "replyCounter"
	value: string | number | boolean
}

export type TTicketStatus =
	| "Open"
	| "Replied"
	| "Pending"
	| "Closed"

export type TTicketFilters =
	| "Open"
	| "Replied"
	| "Pending"
	| "Closed"
	| "All"
	| "Unresolved"

export type TTicketPriority =
	|"Low"
	| "Normal"
	| "High"

/**
 * Ticket's data (an extend of TTicketProperties)
 */
export type TTicket = {
	pid: string
	createdAt: string
	updatedAt: string
	//
	Name: string
	userNote: string | null
	adminNote: string | null
	category: string
	/**
	 * relatedProduct = `cartItemId|filename`
	 * => cartItemId = relatedProduct.split("|")[0]
	 * => filename = relatedProduct.split("|")[1]
	 */
	relatedProduct: string | null
	content: string
	priority: TTicketPriority
	status: TTicketStatus
	token: number
	/**
	 * `uid` who created this reply
	 */
	uid: string
	replyCounter: number
} | null


export type TTicketReply = {
	createdAt: string
	updatedAt: string
	blockIds: string[]
	uid: string,
	content: string
}

export type TSingleTicketData = {
	properties: TTicket
	replies: TTicketReply[]
}

/************************************************************************************************
 *
 *  	STORE
 * 
 ************************************************************************************************/

export type TUserPrefs = {
	acceptCookies: boolean
	activeFilter: TProductFilters
	activeTicketFilter: TTicketFilters
	lang: TLanguage
	showAsGrid: boolean
	sidebarExpanded: boolean
}

export type TLanguage =
	| "en"
	| "vi"

export type TProductFilters =
	| "Best selling"
	| "Newest"
	| "Recently Updated"
	| "Highest price"
	| "Lowest price"

export type TProductCategory =
	| "Hosting"
	| "WordPress Hosting"
	| "Email Server"
	| "SSL"
	| "All"

export type TSubmitState =
	| "idle"
	| "success"
	| "error"
	| "submitting"

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
	meta?: string
}

export type TMenuGroup = {
	header: string,
	items: TMenuItem[]
}

/**
 * 
 * publishedDate: ở định dạng YYYY-MM-DD
 * 	ví dụ: 2022-03-31
 * 
 * language: "en" or "vi"
 * 
 */
export type TBlog = {
	title: string
	filename: Dictionary<string>
	image: string
	publishedDate: string
	description: string
	tags: string[]
	language: string
}

export type TBreadcrumb = {
	title: string,
	url?: string,
	icon?: string
}

export type TIntent =
	| "accent"
	| "error"
	| "ghost"
	| "info"
	| "primary"
	| "secondary"
	| "success"
	| "warning"

export type TSize =
	| "xs"
	| "sm"
	| "md"
	| "lg"

//TODO:implement the icon for `TMenuItem`
//this would change `DashboardSideBar`

export type TSidebarMenuItem = TMenuItem & {
	children?: TMenuItem[]
}

export type TFooterMenuItem = {
	title: string
	children: TMenuItem[]
}

/************************************************************************************************
 *
 *  	PRODUCTS, SHOPPING-CART, CHECKOUT
 * 
 ************************************************************************************************/


/**
 * validTo: ở định dạng `YYYY-MM-DD`
 * 	Ví dụ: `2022-03-31`
*/
export type TDiscount = {
	price: number
	validTo: string
}

export type TLicense = "Regular License" | "Extended License"
export type TSupportTerm = "support_6m" | "support_12m"

/**
 * 
 * filename: must be the filename of the `.mdx`
 * 	Usage: sẽ dùng file này này làm `id`, làm `slug`...v.v
 * 
 * banners: Tối thiểu 2 banners
 * 	`banners[0]` => thiết kế cho ProductGrid
 * 	`banners[1]` => thiết kế cho ProductList
 * 
 * collection: được lấy từ `/data/collections.tsx`
 * 	Note: `export const collections: Dictionary<CollectionType>`
 * 
 * framework: remix
 * softwareVersion: react17 | react18 | remix1.3
 * 
 */
export type TProduct = {
	filename: string
	title: string
	description: string
	regularLicense: number
	extendedLicense: number
	discount?: TDiscount
	publishedDate: string
	lastUpdate: string
	highlight: string[]
	logo: string,
	banners: string[]
	images: string[]
	collections: string[]
	tags: string[]
	framework: string
	softwareVersion: string[]
	isResponsive: boolean
	browsers: string[]
	compatibleWith: string[]
	layout: string
	/**
	 * Nên ngắn gọn, ví dụ:
	 * `Documented` thay vì `Fully documented`
	 */
	documentation: string
	fileIncluded: string[]
}

export type TCollection = {
	name: string
	description: string
	icon: string
	banners: {
		big: string
		small: string
	}
}

export type TDiscountMethod = "percentage" | "fixed"

export type TCouponAppliedProduct = {
	filename: string
	/**
	 * Please note that there would never have `category === "support_6m"`
	 * because `support_6m` is default support without any fee, it is included by default
	 */
	category: TLicense | TSupportTerm
	/**
	 * which category to apply the discount
	 */
	type: TDiscountMethod
	/**
	 * if `type = "percentage"` => `discount = 10` means discount 10%
	 * if `type = "fixed"` => then the amount here is in USD
	 */
	discount: number
}

export type TCoupon = {
	couponName: string
	description: string
	expiredDate: string
	appliedProducts: TCouponAppliedProduct[]
}

export type TCartDataLoader = {
	coupons: TCoupon[]
}

export type TItemChangedHitory = {
	/**
	 * the date when use execute this history
	 */
	date: string
	/**
	 * supported actions for purchased items
	 */
	action: "licenseUpgrade" | "refund" | "supportRenew"
	/**
	 * reserved data for `licence upgrade`
	 */
	licenseOrigin?: TLicense
	licenseTarget?: TLicense
	/**
	 * reserved data for `licence renew`
	 */
	supportOrigin?: TSupportTerm
	supportTarget?: TSupportTerm
	cost?: number
	/**
	 * Support coupon for this history
	 */
	couponName: string
	expiredDate: string
	/**
	 * having a note input field for any purpose
	 */
	note: string
}

export type TCartItemCookie = {
	cartItemId: string
	filename: string
	license: TLicense
	couponName: string
	supportTerm: TSupportTerm
}

export type TCartItem = TCartItemCookie & {
	product?: TProduct
}

export type TPurchasedProductDb = TCartItemCookie & {
	/**
	 * userId
	 */
	uid: string
	/**
	 * mã định danh đơn hàng
	 */
	orderId: string
	/**
	 * history array must have a least 1 item
	 */
	history: TItemChangedHitory[]
	/**
	 * for noting purpose only
	 */
	note: string
}

export type TPurchasedProduct = TPurchasedProductDb & {
	product?: TProduct
}


/************************************************************************************************
 *
 *  	PRODUCTS, SHOPPING-CART, CHECKOUT
 * 
 ************************************************************************************************/

export type TSearchableOrderProperty =
	| "uid"
	| "orderId"
	| "cartItemId"
	| "filename"
	| "couponName"
	| "expired"

/**
 * `TOrderProperties` is DB_ORDERS SCHEME NAME
 */
export type TOrderProperty = {
	name: "Name"
	| "uid"
	| "orderId"
	| "cartItemId"
	| "filename"
	| "license"
	| "couponName"
	| "supporTerm"
	| "expired"
	value: string | number | boolean
}

/**
 * OrderedItem (an extend of TOrderProperties)
 */
export type TOrderedItem = {
	pid: string
	createdAt: string
	updatedAt: string
	//
	uid: string
	orderId: string
	cartItemId: string
	filename: string
	license: string
	couponName: string | null
	supportTerm: string
	expired: string
} | null