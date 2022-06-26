import type { TLang } from "~/types"

/**
 * Keys
 */

const langKey = [
	"sign-in-to-your-account",
	"quick-content-updating",
	"email",
	"password",
	"forgot-your-password",
	"forgot-password",
	"sign-in",
	"signing...",
	"extra1",
	"extra2",
] as const

/**
 * Types to data consistency checking
 */

type TLangKey = typeof langKey[number]
type TLangTable = { [key in TLang]: { [P in TLangKey]: string } }

/**
 * Values for each languages
 */

const loginLangTable: TLangTable = {
	en: {
		"sign-in-to-your-account":"Sign in to your account",
		"quick-content-updating":"Quick content updating",
		"email":"Email",
		"password":"Password",
		"forgot-your-password":"Forgot your password?",
		"forgot-password":"Forgot Password",
		"sign-in":"Sign In",
		"signing...":"Signing...",
		"extra1":"There is no auto reset password implemented.",
		"extra2":"Please contact the site's owner to reset your password.",
	},
	vi: {
		"sign-in-to-your-account":"Đăng nhập",
		"quick-content-updating":"Quản lý nhanh tài khoản",
		"email":"Địa chỉ email",
		"password":"Mật khẩu",
		"forgot-your-password":"Quên mật khẩu?",
		"forgot-password":"Quên mật khẩu",
		"sign-in":"Đăng nhập",
		"signing...":"Đang đăng nhập...",
		"extra1":"Không có tính năng thay đổi mật khẩu tự động.",
		"extra2":"Hãy liên hệ với chủ nhân website để thay đổi mật khẩu của bạn.",
	}
}

export default loginLangTable