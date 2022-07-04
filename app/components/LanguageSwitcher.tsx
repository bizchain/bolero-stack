/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   LanguageSwitcher  | 1.1.0                                       ║ *
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

type TLangMeta = {
	key: TLang,
	langName: string
	imgBase64: string
}

export const langMeta: TLangMeta[] = [
	//the very first item default language
	{
		key: "en",
		langName: "english",
		imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABQUlEQVRoge3WsUrDUBTG8X80qC1CCLg5uHSwQzfBxaGLiKPiW/gCdezQ1UfwCRQndRAXBQmCiw7dhFIIFdGESMUIGqcEoyK03ptw4fym3OXmfpyccwNCCCGEKI8FkCSJ1dw8/lC9+VHUVr1lZvbsygKY0PaGguQCVCs2G+sLY68bdZdG3dV53h/s9GF6apLd9jKLNYenMMa7fhhpfdd7prOzBMB265K+P+R1/1TfyV0nHyB+e+fcG+Dfv3DTDUZeB2HMhTcAoO8P9R38G61NfLC3onrLzJzrWPClAqlqxWatOc/hSW+sddoDt92Ama1VbQFSuQCq+4BI+/nzAUzsA+N7QO6Bv+6BQgPo+P6LmELyM1e2rAKPYaS8Ajr9OoVMZHyAbAoVMTF0ML4CxgeQKVQ24wPIFCqb8QGEEEIIIf7hEycURuUfhn7yAAAAAElFTkSuQmCC"
	},
	{
		key: "vi",
		langName: "vietnamese",
		imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABsElEQVRoge2Yy0rDQBSG/0kmtEisKK5c+ASKiDcQ26cRxY2iPoDgyr24ddEX6APUlT6BCi68FaQqFSpRcNLm6iIIFtpqyRmDcD4IDMkw53zMORMSgGEYhmH+MeJrcDkzE2eZyKBMn58LADCyTiQtLJA1LJA1LNAPa1zAGhc/T0yBVoFCUaKwInWG+AOBkl4BbavLUYGhKRMCgBwzELxGWuJo24HCioQwkgiFZVNXGI0CRdl1TE3qlUdKEhM7OZh279PGnjMxdWJ33ItUjKdDD07VTxU/9Q68nQa4W1dQV7+vcfc6wu2Gmzp5gKiEvEaM2rbCS9kD+nnEQLPi435LwXukaWqy4oxD4KXsoVWLMLmX7zrnYb+F97OAKiQADU1sWL2fCYv+rUwu8P3Eif3k+mKkSH+ckgoYOcBeSJL0GjFquy7uN12060m924sSRp52F0gF7KUkQafq43ZVQV2FcG9C3K0pNCt+hyAVpG+Y4XmJ+kELzklno0Ye8HzUxsdlCHvWJG1kUoHGcRuB0/vnxvtpAHURUoakLaF+yQ8yZxD4iyxrWCBrWIBhGIZhmBR8AlAegdvTb90RAAAAAElFTkSuQmCC"
	},
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

	const { lang, t } = useTranslate([languageSwitcherLangTable])
	const currentLangMeta = langMeta.find(meta => meta.key === lang) ?? langMeta[0]

	const otherSearchParams = React.useMemo(() =>
		location.search
			.slice(1)
			.split("&")
			.filter(param => !param.startsWith("lang="))
			.join("&"), [location.search])

	const generateUrl = (key: string) => {
		return (key === DEFAULT_LANGUAGE)
			? otherSearchParams
				? location.pathname + "?" + otherSearchParams 
				: location.pathname
			: otherSearchParams
				? `${location.pathname}?lang=${key}&${otherSearchParams}`
				: `${location.pathname}?lang=${key}`
	}

	return (
		<div className={clsx("dropdown dropdown-end", className)}>
			<label tabIndex={0} className="cursor-pointer group">
				<div className="w-6 h-6">
					<motion.img
						src={currentLangMeta.imgBase64}
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
				{langMeta.map(meta => (
					<li
						key={meta.key}
						className={(lang === meta.key) ? "bg-gray-200 rounded-lg text-center" : ""}
					>
						<Link to={generateUrl(meta.key)}>
							<motion.img
								src={meta.imgBase64}
								className={clsx("w-6 h-6", (lang !== meta.key) ? "grayscale hover:grayscale-0" : "")}
								whileHover={{ scale: 1.4, rotate: -15, textShadow: "0px 0px 8px rgb(255,255,255)" }}
								alt=""
							/>
							{flagOnly ? null : <span>{t(meta.langName)}</span>}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}