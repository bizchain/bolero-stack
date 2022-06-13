import { ActionFunction, json } from "@remix-run/cloudflare"

import { addBlocks, apiHeaders } from "@bizchain.vn/notion"

import { ERROR_PAGE_ID, NOTION_API_KEY } from "~/data/static.server"

export const action: ActionFunction = async ({ request }) => {
	/**
	 * This API only works when user provide ERROR_PAGE_ID
	 */
	if (!ERROR_PAGE_ID)
		return json(
			{ message: "ERROR_PAGE_ID not found - Docs: https://docs.bizchain.vn/docs/developer/install/error-report" },
			{ status: 400 }
		)

	/**
	 * Record the error and datetime as a Rich_text block
	 */
	const formData = await request.formData()

	const secret = String(formData.get("secret"))
	if (secret !== "ec6h%T^9dvnt^CL5aY")
		return json({ message: "ACTION DENIED" }, { status: 403 })

	const message = String(formData.get("error"))
	const date = String(formData.get("date"))
	const errorStr = `${date} >> ${message}`

	//All errors will be posted to a specified page

	try {
		await addBlocks(apiHeaders(NOTION_API_KEY), ERROR_PAGE_ID, errorStr)
	} catch (error) {
		return json({
			message: "Failed to record the error to database. ERROR_PAGE_ID not found - Docs: https://docs.bizchain.vn/docs/developer/install/error-report"
		}, { status: 400 })
	}

	return json({ message: "Error information received successfully" }, { status: 200 })
}