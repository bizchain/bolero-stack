import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import { sendMailJet } from "@bizchain.vn/utils"

import { ADMIN_EMAIL, SITE_NAME } from "~/data/static"
import { MAILJET_APIKEY_PRIVATE, MAILJET_APIKEY_PUBLIC } from "~/data/static.server"
import EmailWelcome from "~/components/emails/EmailWelcome"

/**
 * Send welcome email to newly created user
 * @param {string} name 
 * @param {string} email 
 * @returns 
 */
export async function sendWelcomeEmail(name: string, email: string) {
	const htmlBody = renderToStaticMarkup(<EmailWelcome name={name} />)
	const res = await sendMailJet(
		{
			sender: { name: SITE_NAME, email: ADMIN_EMAIL },
			receiver: { name, email },
			subject: `Welcome to ${SITE_NAME}`,
			htmlBody: htmlBody
		},
		{
			APIKEY_PUBLIC: MAILJET_APIKEY_PUBLIC,
			APIKEY_PRIVATE: MAILJET_APIKEY_PRIVATE
		})
	return res
}