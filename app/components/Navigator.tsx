import * as React from "react"

import { MobileMenu } from "./Menu"
import Block from "./Block"
import LanguageSwitcher from "./LanguageSwitcher"
import Link from "./Link"
import navigatorLangTable from "~/languages/Navigator"
import useTranslate from "~/utils/useTranslate"

export default function Navigator() {
	const { t } = useTranslate([navigatorLangTable])
	return (
		<Block className="bg-gray-300">
			<Block.Fixed className="items-center">
				<div className="flex justify-center flex-grow p-4 space-x-4">
					<Link to="/">{t("home")}</Link>
					<Link to="/login">{t("login")}</Link>
					<Link to="/about-us">{t("about-us")}</Link>
					<Link to="/sample-page">{t("sample-page")}</Link>
				</div>
				<LanguageSwitcher flagOnly={false} className="mx-3 bg-gray-300" />
				<MobileMenu buttonColor="#d97706" className="flex lg:hidden"/>
			</Block.Fixed>
		</Block>
	)
}