import { MAILJET_APIKEY_PRIVATE, MAILJET_APIKEY_PUBLIC } from "~/data/keys.server"

export type EmailDataType = {
	sender: {
		name: string
		email: string
	},
	receiver: {
		name: string
		email: string
	},
	subject: string
	htmlBody: string
}

function extractContent(html:string):string {
	return html.replace(/<[^>]*>/g, "")
}

export async function sendMailJet(data: EmailDataType) {
	const res = await fetch("https://api.mailjet.com/v3.1/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Basic " + btoa(`${MAILJET_APIKEY_PUBLIC}:${MAILJET_APIKEY_PRIVATE}`)
		},
		body: JSON.stringify({
			"Messages": [
				{
					"From": {
						"Email": data.sender.email,
						"Name": data.sender.name
					},
					"To": [
						{
							"Email": data.receiver.email,
							"Name": data.receiver.name
						}
					],
					"Subject": data.subject,
					"TextPart": extractContent(data.htmlBody),
					"HTMLPart": data.htmlBody
				}
			]
		})
	})

	return res.json()
}