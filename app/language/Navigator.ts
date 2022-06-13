import type { TLang } from "~/types"

/**
 * Keys
 */

const langKey = [
	"home",
	"login",
	"sample-page",
] as const

/**
 * Types to data consistency checking
 */

type TLangKey = typeof langKey[number]
type TLangTable = { [key in TLang]: { [P in TLangKey]: string } }

/**
 * Values for each languages
 */

const navigatorLangTable: TLangTable = {
	en: {
		"home":"Home",
		"login":"Login",
		"sample-page":"Sample Page",
	},
	vi: {
		"home":"Trang chủ",
		"login":"Đăng nhập",
		"sample-page":"Trang mẫu",
	}
}

export default navigatorLangTable