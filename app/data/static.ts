/**
 * THE DATA IN THIS FILE WILL SERVE THE CLIENT-SIDE
 */

import { TLang } from "~/types"

export const SITE_NAME = "Your Greate Online VCard"
export const SITE_SLOGAN = "Làm hết sức - Chơi hết mình"
export const SITE_SHORT_DESC = ""
export const SITE_LONG_DESC = ""
export const SITE_KEYWORDS = ""

export const SITE_BASE_URL = process.env.NODE_ENV === "production"
	?  "https://bizchain.vn"
	:  "http://localhost:8788"

export const ADMIN_EMAIL = "admin@example.com"

export const SUPPORTED_LANGUAGE: TLang[] = ["en", "vi"]
export const DEFAULT_LANGUAGE: TLang = "vi"