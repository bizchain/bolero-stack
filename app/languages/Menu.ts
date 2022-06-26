
/**
 * Keys
 */

const langKey = [
	"chon-diem-den-cua-ban",
	"menu",
	"khoa-quan-tri-du-lich",
	//
	"trang-chu",
	//
	"gioi-thieu",
	"lich-su-thanh-lap",
	"co-cau-to-chuc",
	"thong-tin-lien-he",
	//
	"chuong-trinh-dao-tao",
	"nhan-vien-huong-dan-du-lich",
	"kinh-doanh-dich-vu-va-lu-hanh",
	"quan-tri-khach-san-nha-hang",
	//
	"giang-vien",
	"giang-vien-co-huu",
	"giang-vien-thinh-giang",
	//
	"sinh-vien",
	"ban-chap-hanh-cuu-sinh-vien",
	"hoat-dong-cuu-sinh-vien",
	//
	"cuu-sinh-vien",
	"ban-chap-hanh-cuu-sinh-vien",
	"hoat-dong-cuu-sinh-vien",
	//
	"doan-hoi",
	"lien-chi-doan-khoa",
	"clb-sinh-vien-tinh-nguyen",
	"hoi-sinh-vien",
	//
	"tin-tuc",
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

const menuLangTable: TLangTable = {
	vi: {
		"chon-diem-den-cua-ban": "Chọn điểm đến của bạn",
		"menu":"Menu",
		"khoa-quan-tri-du-lich": "Khoa Quản Trị Du Lịch",
		//
		"trang-chu": "Trang chủ",
		//
		"gioi-thieu": "Giới thiệu",
		"lich-su-thanh-lap": "Lịch sử thành lập",
		"co-cau-to-chuc": "Cơ cấu tổ chức",
		"thong-tin-lien-he": "Thông tin liên hệ",
		//
		"chuong-trinh-dao-tao": "Chương trình đào tạo",
		"nhan-vien-huong-dan-du-lich": "NV Hướng dẫn du lịch",
		"kinh-doanh-dich-vu-va-lu-hanh": "KD Dịch vụ và Lữ hành",
		"quan-tri-khach-san-nha-hang": "Quản trị NH-KS",
		//
		"giang-vien": "Giảng viên",
		"giang-vien-co-huu": "Giảng viên cơ hữu",
		"giang-vien-thinh-giang": "Giảng viên thỉnh giảng",
		//
		"sinh-vien": "Sinh viên",
		//
		"cuu-sinh-vien": "Cựu sinh viên",
		"ban-chap-hanh-cuu-sinh-vien":"Ban chấp hành cựu sinh viên",
		"hoat-dong-cuu-sinh-vien": "Hoạt động cựu sinh viên",
		//
		"doan-hoi": "Đoàn hội - Câu Lạc Bộ",
		"lien-chi-doan-khoa": "Liên chi Đoàn Khoa",
		"clb-sinh-vien-tinh-nguyen": "CLB Sinh viên tình nguyện",
		"hoi-sinh-vien": "Hội sinh viên",
		//
		"tin-tuc": "Tin tức",
	},
	en: {
		"chon-diem-den-cua-ban": "Choose your destination",
		"menu":"Menu",
		"khoa-quan-tri-du-lich": "Faculty of Tourism Management",
		//
		"trang-chu": "Home",
		//
		"gioi-thieu": "Introduction",
		"lich-su-thanh-lap": "Establishment history",
		"co-cau-to-chuc": "Organizational structure",
		"thong-tin-lien-he": "Contact Information",
		//
		"chuong-trinh-dao-tao": "Curriculum",
		"nhan-vien-huong-dan-du-lich": "Tour Guide",
		"kinh-doanh-dich-vu-va-lu-hanh": "Services and Travel",
		"quan-tri-khach-san-nha-hang": "Hotel and Restaurant Management",
		//
		"giang-vien": "Lectures",
		"giang-vien-co-huu": "Organic Lecturer",
		"giang-vien-thinh-giang": "Guest Lecturer",
		//
		"sinh-vien": "Students",
		//
		"cuu-sinh-vien": "Alumni Association",
		"ban-chap-hanh-cuu-sinh-vien": "Executive Committee of Alumni Association",
		"hoat-dong-cuu-sinh-vien": "Alumni Association Activities",
		//
		"doan-hoi": "Association - Club",
		"lien-chi-doan-khoa": "Faculty Youth Union",
		"clb-sinh-vien-tinh-nguyen": "Student Volunteer Club",
		"hoi-sinh-vien": "Students' Association",
		//
		"tin-tuc": "News",
	}
}

export default menuLangTable