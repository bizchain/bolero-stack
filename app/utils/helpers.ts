import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "~/data/static"
import type { Language } from "~/types"

export function getLang(url: string) {
	const urlObj = new URL(url)
	const _lang = urlObj.searchParams.get("lang") as Language
	const lang = SUPPORTED_LANGUAGES.includes(_lang) ? _lang : DEFAULT_LANGUAGE
	return lang
}