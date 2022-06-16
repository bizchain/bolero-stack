import * as React from "react"

import Navigator from "~/components/Navigator"
import useTranslate from "~/utils/useTranslate"
import navigatorLangTable from "~/language/Navigator"

export default function AboutRoute() {
	const { t } = useTranslate(navigatorLangTable)
	return (
		<>
			<Navigator />
			<div className="p-10 bg-red-100">
				<h1>{t("about-us")}</h1>
			</div>
		</>

	)
}