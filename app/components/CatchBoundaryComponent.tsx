import * as React from "react"

import errorBoundaryLangTable from "~/language/ErrorBoundary"
import Link from "./Link"
import useTranslate from "~/utils/useTranslate"

export default function CatchBoundaryComponent({ message }: { message: string}) {
	const { t } = useTranslate(errorBoundaryLangTable)
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