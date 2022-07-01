import { cacheControl } from "@bizchain.vn/utils"
import { TLang } from "~/types"

export const SITE_NAME = "SITE_NAME"
export const SITE_SLOGAN = "SLOGAN"
export const SITE_SHORT_DESC = "SHORT_DESCRIPTION"
export const SITE_LONG_DESC = "LONG_DESCRIPTION"
export const SITE_KEYWORDS = "KEYWORDS"

export const SITE_URL = "https://bizchain.vn"

export const SITE_BASE_URL = process.env.NODE_ENV === "production"
	?  SITE_URL
	:  "http://localhost:8788"

export const ADMIN_EMAIL = "admin@example.com"

export const SUPPORTED_LANGUAGES: TLang[] = ["en", "vi"]
export const DEFAULT_LANGUAGE: TLang = "vi"

/**
 * Default Cache-Control setting
 */
export const PULBIC_CACHE_CONTROL = cacheControl({
	isPublic: true,
	browserCache: "1 day",
	cdnCache: "7 days",
	staleWhileRevalidate: 300
})