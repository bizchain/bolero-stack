import * as React from "react"
import { json, redirect } from "@remix-run/cloudflare"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useTransition,
} from "@remix-run/react"

import NProgress from "nprogress"
import nProgressStyles from "nprogress/nprogress.css"

import styles from "./styles/app.css"
import { getSeo } from "./seo"
import { cookieUserPrefs } from "./cookies"
import { authenticator } from "./services/auth.server"
import { ADMIN_EMAIL, DEFAULT_LANGUAGE, SITE_KEYWORDS, SUPPORTED_LANGUAGE } from "./data/static"

import type { LinksFunction, LoaderFunction, MetaFunction, ActionFunction, HeadersFunction } from "@remix-run/cloudflare"
import type { TLang, TUser } from "./types"
import invariant from "tiny-invariant"

const [seoMeta, seoLinks] = getSeo()

export const links: LinksFunction = () => {
	return (
		[
			{ rel: "preconnect", href: "https://fonts.gstatic.com" },
			{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" },
			{ rel: "stylesheet", href: styles },
			{ rel: "stylesheet", href: nProgressStyles },
			...seoLinks
		]
	)
}

export const meta: MetaFunction = () => {
	return (
		{
			title: "Great Bolero Website",
			viewport: "width=device-width,initial-scale=1",
			charset: "utf-8",
			keywords: SITE_KEYWORDS,
			...seoMeta,
		}
	)
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	return {
		"Cache-Control": loaderHeaders.get("Cache-Control") ?? ""
	}
}

export type TRootDataLoader = {
	lang: TLang
	acceptCookies: boolean
	isAdmin: boolean
	user: TUser | null
}

export const action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get("Cookie")
	const userPrefs = (await cookieUserPrefs.parse(cookieHeader)) || {}

	const formData = await request.formData()
	const _action = formData.get("_action")
	invariant(typeof _action === "string", "Root >>> Method Not Allow")
	const redirectTo = String(formData.get("redirectTo"))

	if (_action === "redirect") return redirect(redirectTo)

	switch (_action) {
		case "closeCookieMessage":
			userPrefs.acceptCookies = true
			return redirect(redirectTo, {
				headers: {
					"Set-Cookie": await cookieUserPrefs.serialize(userPrefs),
				},
			})

		default:
			return json({ message: "Bad Request" }, { status: 400 })
	}
}

export const loader: LoaderFunction = async ({ request }) => {
	const cookieHeader = request.headers.get("Cookie")
	const userPrefs = (await cookieUserPrefs.parse(cookieHeader)) || {}
	const user = await authenticator.isAuthenticated(request)

	/**
	 * Control the language via search params `?lang=`
	 */
	const url = new URL(request.url)
	const _lang = url.searchParams.get("lang") as TLang
	const lang = SUPPORTED_LANGUAGE.includes(_lang) ? _lang : DEFAULT_LANGUAGE

	return json<TRootDataLoader>(
		{
			lang,
			acceptCookies: userPrefs.acceptCookies ?? false,
			isAdmin: user?.email === ADMIN_EMAIL,
			user,
		},
		{
			headers: {
				"Cache-Control": "max-age=300, stale-while-revalidate=60"
			}
		}
	)
}

export default function App() {
	const transition = useTransition()
	const loaderData = useLoaderData()

	React.useEffect(() => {
		// when the state is idle then we can to complete the progress bar
		if (transition.state === "idle") NProgress.done()
		// and when it's something else it means it's either submitting a form or
		// waiting for the loaders of the next location so we start it
		else NProgress.start()
	}, [transition.state])

	return (
		<html lang={loaderData.lang}>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
