import type { Language } from "~/types"

/**
 * Keys
 */

const langKey = [
	"home",
	"login",
	"about-us",
] as const

/**
 * Types to data consistency checking
 */

type TLangKey = typeof langKey[number]
type TLangTable = { [key in Language]: { [P in TLangKey]: string } }

/**
 * Values for each languages
 */

const navigatorLangTable: TLangTable = {
	en: {
		"home":"Home",
		"login":"Login",
		"about-us":"About us",
	},
	vi: {
		"home":"Trang chủ",
		"login":"Đăng nhập",
		"about-us":"Giới thiệu",
	}
}

export default navigatorLangTable