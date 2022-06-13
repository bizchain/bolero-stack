import * as React from "react"

import { Outlet } from "@remix-run/react"
import { redirect } from "@remix-run/cloudflare"

import { cookieUserPrefs } from "~/cookies"
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGE } from "~/data/static"

import type { LoaderFunction } from "@remix-run/cloudflare"
import type { TLang } from "~/types"

export const loader: LoaderFunction = async ({ request, params }) => {
	const cookieHeader = request.headers.get("Cookie")
	const userPrefs = (await cookieUserPrefs.parse(cookieHeader)) || {}

	if (SUPPORTED_LANGUAGE.includes(params.langId as TLang) === false){
		const targetLanguage =
			SUPPORTED_LANGUAGE.includes(userPrefs.lang)
				? userPrefs.lang
				: DEFAULT_LANGUAGE
		
		/**
		 * if we access `https://bizchain.vn/r/products`
		 * then it would be redirected to `https://bizchain.vn/{validLangId}/products`
		 * this is useful for sending links via emails
		 */
		const url = new URL(request.url)
		const requestedPathname = url.pathname.split("/")
		if (requestedPathname[1] === "f"){
			requestedPathname[1] = targetLanguage
			return redirect(requestedPathname.join("/"))
		}

		return redirect(`/${targetLanguage}`)
	}

	return null
}

export default function FrontendTemplate() {
	return (
		<>
			<Header />
			<main className="flex flex-col flex-grow mt-24">
				<Outlet />
			</main>
			<Footer />
		</>
	)
}