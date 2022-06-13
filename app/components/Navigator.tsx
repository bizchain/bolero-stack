import * as React from "react"
import navigatorLangTable from "~/language/Navigator"
import useTranslate from "~/utils/useTranslate"
import Link from "./Link"

export default function Navigator(){
	const { t } = useTranslate(navigatorLangTable)
	return (
		<div className="flex justify-center p-4 space-x-4 bg-gray-200">
			<Link to="/">{t("home")}</Link>
			<Link to="/login">{t("login")}</Link>
			<Link to="/sample">{t("sample-page")}</Link>
		</div>
	)
}