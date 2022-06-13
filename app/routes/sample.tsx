import * as React from "react"
import LanguageSwitcher from "~/components/LanguageSwitcher"
import Navigator from "~/components/Navigator"
import languageSwitcherLangTable from "~/language/LanguageSwitcher"
import useTranslate from "~/utils/useTranslate"

export default function SampleRoute() {
	const { t } = useTranslate(languageSwitcherLangTable)
	return (
		<>
			<Navigator />
			<div className="flex justify-end p-10">
				<LanguageSwitcher flagOnly={false} />
			</div>
			<div className="p-10 bg-red-100">
				Displaying {t("english")}
			</div>
		</>

	)
}