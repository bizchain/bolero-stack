import * as React from "react"
import navigatorLangTable from "~/language/Navigator"
import useTranslate from "~/utils/useTranslate"
import Block from "./Block"
import LanguageSwitcher from "./LanguageSwitcher"
import Link from "./Link"

export default function Navigator() {
	const { t } = useTranslate(navigatorLangTable)

	return (
		<div className="flex items-center justify-center bg-gray-200">
			<Block className="w-full">
				<Block.Fixed className="items-center justify-between">
					<div className="flex justify-center flex-grow p-4 space-x-4">
						<Link to="/">{t("home")}</Link>
						<Link to="/login">{t("login")}</Link>
						<Link to="/about-us">{t("about-us")}</Link>
					</div>
					<LanguageSwitcher flagOnly={false} className="mx-3 bg-gray-200" />
				</Block.Fixed>
			</Block>
		</div>
	)
}