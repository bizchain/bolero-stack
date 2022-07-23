/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   useTranslate  | 1.2.0                                           ║ *
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

type LangTable = { [key in string]: { [key in string]: string } }

/**
 * I extract the logic to an independent func named `getTranslation`
 * to be used in server-side codes such as `loader` or `action`
 * primary to translate site's meta text
 * Note: this function is to translate multi-keys at the same time
 */
export function getTranslations(langTables: LangTable[], lang: string, keys: string[]): Record<string, string> {
	const keysTranslated: Record<string, string> = {}

	//Searching each key for its translation	
	keys.forEach(key => {
		let translated = ""
		langTables.every((table) => {
			const found = table[lang][key]
			//if we found the translated, get the result and exit the loop
			if (found) {
				translated = found
				return false
			}
			//or continue next loop
			return true
		})
		//if no translation found, then `key` would be used
		keysTranslated[key] = (translated !== "") ? translated : key
	})

	return keysTranslated
}

export default function useTranslate(langTables: LangTable[]) {
	const rootData = useMatchesById("root").data as TRootDataLoader
	// `useTranslate` used in many places, in some cases,
	// `rootData` could be `undefined`
	// that's why we will fallback to `DEFAULT_LANGUAGE`
	const currentLanguage = rootData?.lang ?? DEFAULT_LANGUAGE

	const translator = React.useCallback((key: string, values?: string[]) => {
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

		/**
		 * Get the final translation string
		 * Note: if no translation found, then `key` would be used
		 */
		const finalTranslation = (translated !== "") ? translated : key

		if (values === undefined || values.length === 0)
			return finalTranslation

		const finalArr = finalTranslation.split("%s")

		//in case there is no placeholder
		if (finalArr.length === 1) return finalTranslation

		/**
		 * Note: `the number of placeholders` = finalArray.length - 1 
		 * because `x` placeholder would create an array with `x + 1` elements
		 */
		const newValues =
			(values.length > (finalArr.length - 1))
				? values.slice(0, finalArr.length - 1)
				: values.slice()

		newValues.forEach((value, idx) => {
			/**
			 * splice will modify the object, then, after every modification
			 * the next position would be change and we have a formula as following
			 * next position = `index * 2 + 1`
			 */
			finalArr.splice((idx * 2 + 1), 0, value)
		})

		return finalArr.join("")
	}, [currentLanguage, langTables])

	return ({
		/**
		 * Current selected language of your website
		 * it should be type of `Language`
		 */
		lang: currentLanguage,
		/**
		 * A function to translate a provided langKey
		 * and it support replace `%s` with provided `values`
		 * example:
		 *   - key = `i %s you %s`
		 *   - values = ["love", "alot"]
		 * the translator would return `i love you alot`
		 * t(key: string, values?: string[])
		 */
		t: translator
	})
}