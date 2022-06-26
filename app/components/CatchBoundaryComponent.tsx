/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   CatchBoundaryComponent  | 1.0.0                                 ║ *
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

import errorBoundaryLangTable from "~/languages/ErrorBoundary"
import Link from "./Link"
import useTranslate from "~/utils/useTranslate"

export default function CatchBoundaryComponent({ message }: { message: string}) {
	const { t } = useTranslate([errorBoundaryLangTable])
	return (
		<div className="w-screen h-screen">
			<div className="flex items-center justify-center w-full">
				<section className="max-w-screen-lg px-4 py-10 prose rounded-md md:px-6 lg:px-8 xl:px-10 bg-red-50">
					<h2>{t("error-message-from-app")}</h2>
					<pre>{message}</pre>
					<p>{t("refresh-the-page-or")} <Link to="." className="alink-dashboard decoration-slate-50">{t("click-here")}</Link> {t("to-start-over")}.</p>
					<blockquote>
						{t("error-report-notice-1")}
						<br />
						{t("error-report-notice-2")}
					</blockquote>
				</section>
			</div>
		</div>
	)
}