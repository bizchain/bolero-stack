import * as React from "react"

import { useFetcher, useLocation, useTransition } from "@remix-run/react"

import { motion } from "framer-motion"
import clsx from "clsx"

import type { TLang } from "~/types"
import useTranslate from "~/utils/useTranslate"
import languageSwitcherLangTable from "~/language/LanguageSwitcher"

type LangListType = {
	key: TLang,
	langName: string
	imgurl: string
}

export const langList: LangListType[] = [
	{ key: "en", langName: "english", imgurl: "/img/flags/flag-usa.png" },
	{ key: "vi", langName: "vietnamese", imgurl: "/img/flags/flag-vietnam.png" },
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
	const transition = useTransition()
	const fetcher = useFetcher()

	const { lang: currentLang, t } = useTranslate(languageSwitcherLangTable)
	const currentLangItem = langList.find(lang => lang.key === currentLang) ?? langList[0]

	return (
		<div className={clsx("dropdown dropdown-end", className)}>
			<label tabIndex={0} className="cursor-pointer group">
				<div className="w-6 h-6">
					<motion.img
						src={currentLangItem.imgurl}
						whileHover={{ scale: 1.4, rotate: -15, textShadow: "0px 0px 8px rgb(255,255,255)" }}
					/>
				</div>
			</label>
			<ul
				tabIndex={0}
				className={
					clsx(
						"p-2 mt-3 border-[1px] border-gray-300 space-y-1 shadow menu menu-compact dropdown-content bg-base-100 rounded-box",
						flagOnly ? "w-[4.5rem]" : "w-[8rem]"
					)
				}
			>
				{langList.map(lang => (
					<li
						key={lang.key}
						className={(currentLang === lang.key) ? "bg-gray-200 rounded-lg text-center" : ""}
					>
						<fetcher.Form method="post" action="/">
							<input type="hidden" name="lang" value={lang.key} />
							<input type="hidden" name="redirectTo" value={location.pathname} />
							<button type="submit" name="_action" value="changeLanguage">
								{(currentLang === lang.key && transition.submission)
									? <div className="p-0 mx-auto my-auto lds-dual-ring"></div>
									:
									<span>
										<motion.img
											src={lang.imgurl}
											className={clsx("w-6 h-6", (currentLang !== lang.key) ? "grayscale hover:grayscale-0" : "")}
											whileHover={{ scale: 1.4, rotate: -15, textShadow: "0px 0px 8px rgb(255,255,255)" }}
										/>
										{flagOnly ? null : <span>{t(lang.langName)}</span>}
									</span>
								}
							</button>
						</fetcher.Form>
					</li>
				))}
			</ul>
		</div>
	)
}