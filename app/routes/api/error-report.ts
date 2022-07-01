/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   api/error-report | 1.0.1                                        ║ *
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

import { ActionFunction, json } from "@remix-run/cloudflare"
import { LICENSE_KEY } from "~/data/static.server"

/**
 * Track any error happened for bug fixed
 */
export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()

	const secret = String(formData.get("secret"))
	//secret is hard-coded, DO NOT CHANGE
	if (secret !== "ec6h%T^9dvnt^CL5aY") return json({ message: "ACTION DENIED" }, { status: 403 })

	const message = String(formData.get("error"))
	const date = String(formData.get("date"))
	const name = String(formData.get("name"))
	const email = String(formData.get("email"))
	const pathname = String(formData.get("pathname"))

	const errorStr = JSON.stringify({
		error: `${date} > ${name} (${email}) > ${message} @ ${pathname} | ${request.url}`,
		lic: LICENSE_KEY
	})

	//connect with our api to record any error happened
	const response = await fetch("https://bizchain.vn/api/error-report", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${LICENSE_KEY}`,
			"Content-Type": "application/json"
		},
		body: errorStr
	})

	const res = await response.json<{ object: string, message: string }>()
	if (res.object === "error") throw new Error(`errorReport: ${res.message}`)

	return json({ message: "Error information received successfully" }, { status: 200 })
}