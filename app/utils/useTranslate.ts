import * as React from "react"
import { useMatchesById } from "./useMatchesById"
import type { TRootDataLoader } from "~/root"

export default function useTranslate(langTable: { [key in string]: { [key in string]: string } }) {
	const rootData = useMatchesById("root").data as TRootDataLoader
	const lang = rootData.lang

	const translator = React.useCallback((key: string) => {
		//if key not existed, then just return the key
		const translated = langTable[lang][key] ?? key
		return translated
	}, [lang, langTable])

	return ({
		/**
		 * Current selected language of your website
		 * it should be type of `TLang`
		 */
		lang,
		/**
		 * A function to translate a provided langKey
		 */
		t: translator
	})
}