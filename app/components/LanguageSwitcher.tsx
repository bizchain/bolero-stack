/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   LanguageSwitcher  | 1.0.0                                       ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2022                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

import * as React from "react"

import { Link, useLocation } from "@remix-run/react"

import { motion } from "framer-motion"
import clsx from "clsx"

import { DEFAULT_LANGUAGE } from "~/data/static"
import languageSwitcherLangTable from "~/languages/LanguageSwitcher"
import useTranslate from "~/utils/useTranslate"

import type { TLang } from "~/types"

type LangListType = {
	key: TLang,
	langName: string
	imgUrl: string
}

export const langList: LangListType[] = [
	//the very first item default language
	{ key: "en", langName: "english", imgUrl: "/img/flags/flag-usa.png" },
	{ key: "vi", langName: "vietnamese", imgUrl: "/img/flags/flag-vietnam.png" },
]

type LanguageSwitcherProps = {
	flagOnly?: boolean
	className?: string
}

/**
 * Droplist to choose site's language
 * @param param0 { flagOnly: true } >> show only flags by default
 * @returns 
 */
export default function LanguageSwitcher({ flagOnly = true, className }: LanguageSwitcherProps) {
	const location = useLocation()

	const { lang: currentLang, t } = useTranslate([languageSwitcherLangTable])
	const currentLangItem = langList.find(lang => lang.key === currentLang) ?? langList[0]

	return (
		<div className={clsx("dropdown dropdown-end", className)}>
			<label tabIndex={0} className="cursor-pointer group">
				<div className="w-6 h-6">
					<motion.img
						src={currentLangItem.imgUrl}
						whileHover={{ scale: 1.4, rotate: -15, textShadow: "0px 0px 8px rgb(255,255,255)" }}
						alt=""
					/>
				</div>
			</label>
			<ul
				tabIndex={0}
				className={
					clsx(
						"p-2 mt-3 border-[1px] border-gray-300 space-y-1 shadow menu menu-compact dropdown-content bg-white rounded-box",
						flagOnly ? "w-[4.5rem]" : "w-[10.5rem]"
					)
				}
			>
				{langList.map(lang => (
					<li
						key={lang.key}
						className={(currentLang === lang.key) ? "bg-gray-200 rounded-lg text-center" : ""}
					>
						<Link to={ lang.key === DEFAULT_LANGUAGE ? location.pathname : `${location.pathname}?lang=${lang.key}`}>
							<motion.img
								src={lang.imgUrl}
								className={clsx("w-6 h-6", (currentLang !== lang.key) ? "grayscale hover:grayscale-0" : "")}
								whileHover={{ scale: 1.4, rotate: -15, textShadow: "0px 0px 8px rgb(255,255,255)" }}
								alt=""
							/>
							{flagOnly ? null : <span>{t(lang.langName)}</span>}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}