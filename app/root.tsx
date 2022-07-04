import * as React from "react"
import { json, redirect } from "@remix-run/cloudflare"
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useLocation,
	useTransition,
} from "@remix-run/react"

import { Toaster } from "react-hot-toast"
import NProgress from "nprogress"
import nProgressStyles from "nprogress/nprogress.css"
import invariant from "tiny-invariant"

import { ADMIN_EMAIL, DEFAULT_LANGUAGE, SITE_KEYWORDS, SITE_NAME, SUPPORTED_LANGUAGES } from "./data/static"
import { authenticator } from "./services/auth.server"
import { cookieUserPrefs } from "./cookies"
import { getSeo } from "./seo"
import CatchBoundaryComponent from "./components/CatchBoundaryComponent"
import ErrorBoundaryComponent from "./components/ErrorBoundaryComponent"
import styles from "./styles/app.css"
import useErrorReport from "./utils/useErrorReport"
import useTranslate from "./utils/useTranslate"

import type { LinksFunction, LoaderFunction, MetaFunction, ActionFunction, HeadersFunction } from "@remix-run/cloudflare"
import type { TLang, TUser } from "./types"
import { cacheControl } from "@bizchain.vn/utils"

const [seoMeta, seoLinks] = getSeo()

export const links: LinksFunction = () => {
	return (
		[
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{ rel: "preconnect", href: "https://fonts.gstatic.com" },
			// { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" },
			{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
			{ rel: "stylesheet", href: styles },
			{ rel: "stylesheet", href: nProgressStyles },
			...seoLinks
		]
	)
}

export const meta: MetaFunction = () => {
	return (
		{
			title: SITE_NAME,
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
	/**
	 * Keep track the language of the site
	 */
	lang: TLang
	/**
	 * Whether user accept cookies or not, this is for EU market regulation
	 */
	acceptCookies: boolean
	/**
	 * Whether use is loggin or not
	 */
	user: TUser | null
	/**
	 * Does current user is the site's owner
	 */
	isAdmin: boolean
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
	const lang = SUPPORTED_LANGUAGES.includes(_lang) ? _lang : DEFAULT_LANGUAGE

	return json<TRootDataLoader>(
		{
			lang,
			acceptCookies: Boolean(userPrefs.acceptCookies),
			isAdmin: user?.email === ADMIN_EMAIL,
			user,
		},
		{
			headers: {
				"Cache-Control": cacheControl({ 
					browserCache: "5 minutes",
					cdnCache: "1 minutes",
					staleWhileRevalidate: 60
				})
			}
		}
	)
}

interface DocumentProps {
	children: React.ReactNode
	lang: string
}

function Document({ children, lang }: DocumentProps) {
	const transition = useTransition()

	React.useEffect(() => {
		// when the state is idle then we can to complete the progress bar
		if (transition.state === "idle") NProgress.done()
		// and when it's something else it means it's either submitting a form or
		// waiting for the loaders of the next location so we start it
		else NProgress.start()
	}, [transition.state])

	return (
		<html lang={lang}>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<Toaster position="bottom-right" />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	const { lang } = useTranslate([])
	return (
		<Document lang={lang}>
			<Outlet />
		</Document>
	)
}

export function ErrorBoundary({ error }: { error: Error }) {
	const { lang } = useTranslate([])
	const location = useLocation()
	useErrorReport(error.message, location.pathname + location.search)
	return (
		<Document lang={lang}>
			<ErrorBoundaryComponent message={error.message}/>
		</Document>
	)
}

export function CatchBoundary() {
	const { lang } = useTranslate([])
	const caught = useCatch()
	const location = useLocation()
	const content = `[${caught.status}] ${caught.statusText}`
	useErrorReport(content, location.pathname + location.search)
	return (
		<Document lang={lang}>
			<CatchBoundaryComponent message={content} />
		</Document>
	)
}
