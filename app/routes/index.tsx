import * as React from "react"

import { getSeoLinks, getSeoMeta } from "~/seo"
import { SITE_BASE_URL, SITE_LONG_DESC, SITE_NAME } from "~/data/static"
import Link from "~/components/Link"
import LanguageSwitcher from "~/components/LanguageSwitcher"
import languageSwitcherLangTable from "~/language/LanguageSwitcher"
import useTranslate from "~/utils/useTranslate"

import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare"
import Navigator from "~/components/Navigator"

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
	const { t } = useTranslate(languageSwitcherLangTable)
	return (
		<div>
			<Navigator />
			<div className="flex justify-end p-10">
				<LanguageSwitcher flagOnly={false} />
			</div>
			<div className="p-10">
				<h1 className="text-3xl font-bold underline">
					{t("english")}
				</h1>
				<div className="prose">
					<p>hello world</p>
					<button>
						<Link to="/login" className="btn btn-primary">Login</Link>
					</button>
					<blockquote>yes please</blockquote>
				</div>
			</div>
		</div>
	)
}
