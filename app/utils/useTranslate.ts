/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   useTranslate  | 1.0.0                                           ║ *
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
import { DEFAULT_LANGUAGE } from "~/data/static"
import { useMatchesById } from "./useMatchesById"
import type { TRootDataLoader } from "~/root"

type TLangTable = { [key in string]: { [key in string]: string } }

export default function useTranslate(langTables: TLangTable[]) {
	const rootData = useMatchesById("root").data as TRootDataLoader
	//`useTranslate` used in many places, in some cases, `rootData` could be `undefined`
	//that's why we will fallback to `DEFAULT_LANGUAGE`
	const currentLanguage = rootData?.lang ?? DEFAULT_LANGUAGE

	const translator = React.useCallback((key: string) => {
		let translated = ""
		langTables.every((table) => {
			const found = table[currentLanguage][key]
			//if we found the translated, get the result and exit the loop
			if (found) {
				translated = found
				return false
			}
			//or continue next loop
			return true
		})
		//if no translation found, then `key` would be used
		return (translated !== "") ? translated : key
	}, [currentLanguage, langTables])

	return ({
		/**
		 * Current selected language of your website
		 * it should be type of `TLang`
		 */
		lang: currentLanguage,
		/**
		 * A function to translate a provided langKey
		 */
		t: translator
	})
}