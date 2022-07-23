/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   useLinkGenerator  | 1.1.0                                       ║ *
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

import { useSearchParams } from "@remix-run/react"

/**
 * Generate new internal link which keep `lang` params unchanged
 * @param slug - any type of slug. eg: `/explore`, `/explore/vietnam?open=searching`
 * @returns 
 */
export default function useLinkGenerator(slug: string) {
	const [searchParams] = useSearchParams()
	const lang = searchParams.get("lang")
	const slugArray = slug.split("?")

	switch (slugArray.length) {
		case 2:
			/**
			 * we only add `lang param` when provided `lang param`
			 * is not exist in provided `slug`.
			 */
			slugArray[1] = slugArray[1] + ((lang && !slug.includes("lang=")) ? `&lang=${lang}` : "")
			break
		case 1:
			if (lang) slugArray.push(`lang=${lang}`)
			break
		default:
			throw new Error("You passed an invalid slug to a custom `Link` component")
			break
	}

	const finalUrl = 
		slugArray.length === 2
			? slugArray.join("?")
			: slug

	return finalUrl 
}