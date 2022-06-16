import { authenticator } from "~/services/auth.server"
import { LoaderFunction } from"@remix-run/cloudflare"

export const loader: LoaderFunction = async ({request}) => {
	await authenticator.logout(request, { redirectTo: "/login" })
}