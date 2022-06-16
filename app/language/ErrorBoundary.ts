
/**
 * Keys
 */

const langKey = [
	"error-message-from-system",
	"error-message-from-app",
	"refresh-the-page-or",
	"click-here",
	"to-start-over",
	"error-report-notice-1",
	"error-report-notice-2"
] as const

/**
 * Types to data consistency checking
 */

import type { TLang } from "~/types"

type TLangKey = typeof langKey[number]
type TLangTable = { [key in TLang]: { [P in TLangKey]: string } }

/**
 * Values for each languages
 */

const errorBoundaryLangTable: TLangTable = {
	vi: {
		"error-message-from-system": "Error message from system",
		"error-message-from-app": "Error message from application",
		"refresh-the-page-or": "Refresh the page or",
		"click-here": "click here",
		"to-start-over": "to start over",
		"error-report-notice-1": "This error has been recorded automatically!",
		"error-report-notice-2": "Our system would be improved day after day. Thank you for using our system!",
	},
	en: {
		"error-message-from-system": "Lỗi hệ thống",
		"error-message-from-app": "Lỗi ứng dụng",
		"refresh-the-page-or": "Tải lại trang hoặc",
		"click-here": "nhấp vào đây",
		"to-start-over": "để bắt đầu từ trang chủ",
		"error-report-notice-1":"Lỗi này đã được hệ thống ghi nhận!",
		"error-report-notice-2":"Bạn an tâm vì chúng tôi luôn quan tâm từng vấn đề nhỏ nhất.",
	}
}

export default errorBoundaryLangTable