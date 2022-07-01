import * as React from "react"

import { json } from "@remix-run/cloudflare"

import { AuthorizationError } from "remix-auth"
import { random } from "lodash"
import { cacheControl, REGEX_EMAIL } from "@bizchain.vn/utils"
import { Honeypot } from "@bizchain.vn/ui"
import clsx from "clsx"
import toast from "react-hot-toast"

import { getSeoMeta } from "~/seo"
import { SITE_LONG_DESC, SITE_NAME } from "~/data/static"
import loginLangTable from "~/languages/login"
import useModal from "~/components/Modal"
import useTranslate from "~/utils/useTranslate"

import { authenticator, routeAuthenticator } from "~/services/auth.server"
import { URL_DASHBOARD } from "~/data/url.server"
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react"
// import useUserPrefs from "~/utils/useUserPrefs"

import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/cloudflare"
import MiniHeader from "~/components/MiniHeader"
import MiniFooter from "~/components/MiniFooter"

// export const links: LinksFunction = () => {
// 	return [
// 		{ rel: "stylesheet", href: styles }
// 	]
// }

export const headers = () => {
	return {
		"Cache-Control": cacheControl({ 
			browserCache: "5 minutes",
			cdnCache: "1 minutes",
			staleWhileRevalidate: 60
		})
	}
}

export const meta: MetaFunction = () => {
	const seoMeta = getSeoMeta({
		bypassTemplate: true,
		title: `Login page - ${SITE_NAME}`,
		description: SITE_LONG_DESC
	})
	return ({ ...seoMeta })
}

type ActionData = {
	errorMessage: string,
	errorId: number
} | undefined

export const action: ActionFunction = async ({ request }) => {
	try {
		/**
		 * the request body could only be read once
		 * so we must clone, and read the data from cloned object
		 */
		const form = await request.clone().formData()
		const redirect = String(form.get("redirect"))
		const successRedirect = redirect ? redirect : URL_DASHBOARD
		console.log({ redirect, successRedirect })

		await authenticator.authenticate("strategyEmailPassword", request, {
			successRedirect,
			throwOnError: true
		})
	} catch (error) {
		if (error instanceof Response) return error
		if (error instanceof AuthorizationError) {
			return json({
				errorMessage: error.message,
				errorId: random(0, 1, true)
			})
		}
		return null
	}

	return null
}

type LoaderData = {
	redirect: string | null
}

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const redirect = url.searchParams.get("redirect")

	const auth = await routeAuthenticator(request)
	if (auth instanceof Response) return auth

	return json<LoaderData>({ redirect })
}

export default function LoginRoute() {
	const { isOpen, closeModal, openModal, Modal } = useModal()
	const { t } = useTranslate([loginLangTable])

	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	// const { lang } = useUserPrefs()
	const transition = useTransition()
	const loaderData = useLoaderData<LoaderData>()
	const redirect = loaderData.redirect

	const actionData = useActionData<ActionData>()

	const notify = React.useCallback(() => toast.error(
		actionData?.errorMessage ?? "",
		{
			style: {
				border: "1px solid rgb(239 68 68)",
				padding: "16px",
				color: "#713200",
				backgroundColor: "rgb(254 202 202)",
			},
			iconTheme: {
				primary: "rgb(220 38 38)",
				secondary: "#FFFAEE",
			},
		}
	), [actionData?.errorMessage])

	React.useEffect(() => {
		if (actionData?.errorId !== undefined) notify()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [actionData?.errorId])

	const invalidEmail = email.length > 0 && !email.match(REGEX_EMAIL)
	const invalidPassword = password.length > 0 && password.length < 6


	return (
		<>
			<MiniHeader/>

			<section
				className="py-24 bg-white md:py-32 bg-[url('/img/elements/pattern-white.svg')] bg-center"
			>
				<div className="container px-4 mx-auto">
					<div className="max-w-sm mx-auto">
						<div className="mb-6 text-center">
							<a className="inline-block mb-6" href="#" title="Logo">
								<img className="h-16" src="/img/logos/logo.png" alt="" />
							</a>
							<h3 className="mb-4 text-2xl font-bold md:text-3xl">{t("sign-in-to-your-account")}</h3>
							<p className="text-lg font-medium text-coolGray-500">{t("quick-content-updating")}</p>
						</div>
						<Form method="post">
							<input
								type="hidden"
								name="redirect"
								defaultValue={redirect ?? ""}
							/>
							<Honeypot fieldName="username" />
							<div className="mb-6">
								<label className="block mb-2 font-medium text-coolGray-800" htmlFor="">{t("email")}</label>
								<input
									autoFocus
									required
									type="email"
									name="email"
									id="email"
									value={email}
									placeholder="hi@bizchain.vn"
									onChange={(e) => { setEmail(e.target.value) }}
									className={clsx(
										"block w-full p-3 leading-5 border rounded-lg shadow-md appearance-none text-coolGray-900 border-coolGray-200 placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
										invalidEmail ? "input-error" : ""
									)}
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 font-medium text-coolGray-800" htmlFor="">{t("password")}</label>
								<input
									className={clsx(
										"block w-full p-3 leading-5 border rounded-lg shadow-md appearance-none text-coolGray-900 border-coolGray-200 placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",

									)}
									type="password"
									id="password"
									name="password"
									value={password}
									onChange={(e) => { setPassword(e.target.value) }}
									placeholder="Password"

								/>
							</div>
							<div className="flex flex-wrap items-center justify-end mb-6">
								<div className="w-full my-auto md:w-auto">
									<div
										className="inline-block text-xs font-medium text-blue-500 cursor-pointer hover:text-blue-600"
										onClick={() => { openModal() }}
									>
										{t("forgot-your-password")}
									</div>
								</div>
							</div>	
							<button
								disabled={invalidEmail || invalidPassword}
								type="submit"
								name="_action"
								value="login"
								className={clsx(
									"inline-block w-full py-3 mb-6 text-base font-medium leading-6 text-center bg-blue-500 rounded-md shadow-sm px-7 text-blue-50 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
									transition.submission ? "loading" : "",
									invalidEmail || invalidPassword ? "btn-disabled" : ""
								)}
							>
								{transition.submission ? t("signing...") : t("sign-in")}
							</button>
						</Form>
					</div>
				</div>
			</section>

			<Modal title={t("forgot-password")} isOpen={isOpen} closeModal={closeModal}>
				<p>{t("extra1")}</p>
				<p>{t("extra2")}</p>
			</Modal>

			<MiniFooter />

		</>
	)
}