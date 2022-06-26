
/**
 * Keys
 */

const langKey = [
	"home",
	"news",
	"chi-tiet",
	"thong-tin-lien-lac",
	"x-articles-with-tag-named-y",
	"view-in",
	"view-this-page-in",
	"page-not-found",
	"article-not-found",
	"there-is-no-article-for-your-requested-address",
	"visit",
	"news-section",
	"for-correct-links",
	"dang-cap-nhat"
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

const generalLangTable: TLangTable = {
	en: {
		"home": "Home",
		"news": "News",
		"chi-tiet": "Details",
		"thong-tin-lien-lac": "Contact details",
		"x-articles-with-tag-named-y": "There are %number articles with tag named \"%name\"",
		"view-this-page-in": "View this page in",
		"view-in": "View in",
		"page-not-found": "404 - Page Not Found",
		"article-not-found": "Article Not Found",
		"there-is-no-article-for-your-requested-address": "There is no article for your requested address",
		"visit":"Visit",
		"news-section":"News Section",
		"for-correct-links":"for correct links",
		"dang-cap-nhat": "Under updating..."
	},
	vi: {
		"home": "Trang chủ",
		"news": "Tin tức",
		"chi-tiet": "Chi tiết",
		"thong-tin-lien-lac": "Thông tin liên lạc",
		"x-articles-with-tag-named-y": "Có %number bài viết được gắn thẻ \"%name\"",
		"view-in": "Xem bằng",
		"view-this-page-in": "Xem trang này bằng",
		"page-not-found": "404 - Trang không tồn tại",
		"article-not-found": "Bài viết không tồn tại",
		"there-is-no-article-for-your-requested-address": "Không có bài viết nào tại địa chỉ bạn đang truy cập",
		"visit":"Truy cập",
		"news-section":"Tin tức",
		"for-correct-links":"để không bị lỗi này.",
		"dang-cap-nhat": "Đang cập nhật..."
	}
}

export default generalLangTable