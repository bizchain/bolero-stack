
/**
 * Keys
 */

const langKey = [
	"english",
	"vietnamese"
] as const

/**
 * Types to data consistency checking
 */

import type { TLang } from "~/types"

type TLangKey = typeof langKey[number]
type TLangTable = { [key in TLang]: { [P in TLangKey]: string } }

/**
 * Values for each languages
 */

const languageSwitcherLangTable: TLangTable = {
	vi: {
		"english": "Tiếng Anh",
		"vietnamese": "Tiếng Việt"
	},
	en: {
		"english": "English",
		"vietnamese": "Vietnamese"
	}
}

export default languageSwitcherLangTable