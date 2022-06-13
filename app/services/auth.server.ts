import { Authenticator, AuthorizationError } from "remix-auth"
import { FormStrategy } from "remix-auth-form"
import { redirect } from "@remix-run/cloudflare"

import { passwordHash } from "@bizchain.vn/utils"

import { isOnboarded, isValidLogin } from "~/models/user.server"
import { sessionStorage } from "~/services/session.server"
import { URL_ACCOUNT_RECOVERY, URL_DASHBOARD, URL_FORGOT_PASSWORD, URL_LOGIN, URL_ONBOARDING, URL_SIGNUP } from "~/data/url.server"

import type { TUser } from "~/types"

export const authenticator = new Authenticator<TUser>(
	sessionStorage, {
		throwOnError: true,
		sessionKey: "YdA4wZ^v15dfM6%9SA",			//hard-coded - do not change after deploying
		sessionErrorKey: "A$bM9r%GK5UNZsr%fb",		//hard-coded - do not change after deploying
	}
)

authenticator.use(
	/**
	 * Note:
	 * - `form` to access values from the form of user
	 * - `context` to access more data from the server
	 */
	new FormStrategy(async ({ form: formData }) => {
		const email = String(formData.get("email"))
		const password = String(formData.get("password"))

		//Honeypot strategy to prevent spam
		const honeypot = String(formData.get("username"))

		if (Boolean(honeypot) === true) throw new AuthorizationError("Something wrong just happened! Error code: \"SPAM DETECTED\"")

		const hashedPassword = await passwordHash(password)

		// And finally, check and get the user's data if exited
		const user = await isValidLogin(email.toLowerCase(), hashedPassword)

		if (user === null) throw new AuthorizationError("User not found or credentials not matched!")

		// And return the user as the Authenticator expects it
		return user
	}),
	"strategyEmailPassword"
)

/**
 * Put this function in any route's loader function which required a logged-in user
 */
export async function routeAuthenticator(request: Request): Promise<Response | TUser | null> {
	const url = new URL(request.url)
	const pathname = url.pathname
	const user = await authenticator.isAuthenticated(request)

	/**
	 * If user not login, ONLY ALLOW to access Login & Signup page!
	 */
	if (user === null)
		if (pathname !== URL_LOGIN && pathname !== URL_SIGNUP)
			return redirect(URL_LOGIN + "?redirect=" + pathname)

	/**
	  * If user logged in, DO NOT ALLOW to access Login, Signup, Account Recovery, forgot-password
	  */
	if (user !== null)
		if (isOnboarded(user)) {
			if ([URL_ONBOARDING, URL_LOGIN, URL_SIGNUP, URL_ACCOUNT_RECOVERY, URL_FORGOT_PASSWORD].includes(pathname))
				return redirect(URL_DASHBOARD)
		}
		else {
			if (pathname !== URL_ONBOARDING)
				return redirect(URL_ONBOARDING)
		}

	/**
	 * If everything is ok, then return `a TUser`
	 */

	return user
}