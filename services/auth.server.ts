import { Authenticator, AuthorizationError } from "remix-auth"
import { FormStrategy } from "remix-auth-form"
import { redirect } from "@remix-run/cloudflare"

import { isOnboarded, isValidLogin } from "~/models/user.server"
import { passwordHash } from "~/utils/helpers"
import { sessionStorage } from "~/services/session.server"
import type { TUser } from "~/types/default"
import { URL_ACCOUNT_RECOVERY, URL_DASHBOARD, URL_FORGOT_PASSWORD, URL_LOGIN, URL_ONBOARDING, URL_SIGNUP } from "~/data/url.server"

export const authenticator = new Authenticator<TUser>(
	sessionStorage, {
		throwOnError: true,
		sessionKey: "YdA4wZ^v2WdfM6F9SA",			//hard-coded - do not change after deploying
		sessionErrorKey: "A$bMijwGK5UNZsr%fb",		//hard-coded - do not change after deploying
	}
)

authenticator.use(
	/**
	 * Note:
	 * - `form` to access values from the form of user
	 * - `context` to access more data from the server
	 */
	new FormStrategy(async ({ form: formData }) => {
		const email = formData.get("email") as string
		const password = formData.get("password") as string

		//This is honeypot
		const honeypot = formData.get("username") as string

		if (Boolean(honeypot) === true) throw new AuthorizationError("Something wrong just happened! Error code: \"BOTA\"")

		/**
		 * we can validate user's input here, but it is necessary here
		 */
		// invariant(typeof username === "string", "username must be a string")
		// invariant(username.length > 0, "username must not be empty")
		// invariant(typeof password === "string", "password must be a string")
		// invariant(password.length > 0, "password must not be empty")

		/**
		 * do not store raw password in the db
		 * password encrypted and decrypted using `aesGcmEncrypt` & `aesGcmDecrypt`
		 */
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
 * Put this function in Loader of any routes which required loggedin
 */
export async function routeAuthenticator(request: Request): Promise<Response | TUser> {
	const url = new URL(request.url)
	const pathname = url.pathname
	const user = await authenticator.isAuthenticated(request)

	/**
	 * If user not login, ONLY ALLOW to access Login & Signup page!
	 */
	if (user === null) {
		if (pathname !== URL_LOGIN && pathname !== URL_SIGNUP)
			return redirect(URL_LOGIN + "?redirect=" + pathname)
	} else {
		/**
		  * If user logged in, DO NOT ALLOW to access Login, Signup, Account Recovery, forgot-password
		  */
		if (isOnboarded(user)) {
			if ([URL_ONBOARDING, URL_LOGIN, URL_SIGNUP, URL_ACCOUNT_RECOVERY, URL_FORGOT_PASSWORD].includes(pathname))
				return redirect(URL_DASHBOARD)
		} else {
			if (pathname !== URL_ONBOARDING)
				return redirect(URL_ONBOARDING)
		}
	}

	return user
}