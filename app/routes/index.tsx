import * as React from "react"

import { getSeoLinks, getSeoMeta } from "~/seo"
import { SITE_BASE_URL, SITE_LONG_DESC, SITE_NAME } from "~/data/static"
import Link from "~/components/Link"
import LanguageSwitcher from "~/components/LanguageSwitcher"
import languageSwitcherLangTable from "~/language/LanguageSwitcher"
import useTranslate from "~/utils/useTranslate"

import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare"
import Navigator from "~/components/Navigator"
import ErrorBoundaryComponent from "~/components/ErrorBoundaryComponent"

export const headers = () => {
	return {
		"Cache-Control": "max-age=300, stale-while-revalidate=60"
	}
}

export const links: LinksFunction = () => {
	const seoLinks = getSeoLinks({
		"canonical": SITE_BASE_URL
	})
	return ([...seoLinks])
}

export const meta: MetaFunction = () => {
	const seoMeta = getSeoMeta({
		bypassTemplate: true,
		title: `${SITE_NAME} - Your Great Website`,
		description: SITE_LONG_DESC
	})
	return ({ ...seoMeta })
}

export default function Index() {
	// const { t } = useTranslate(indexRouteLangTable)
	return (
		<>
			<Navigator />
			<div className="p-10">
				<h1 className="text-3xl font-bold underline">
					Hello world
				</h1>
				<div className="prose">
					hello world
				</div>
			</div>
		</>
	)
}


export function ErrorBoundary({ error }: { error: Error }) {
	return <ErrorBoundaryComponent message={error.message}/>
}

export function CatchBoundary() {
	return (
		<div>
			This is Index Catch Boundary
		</div>
	)
}
