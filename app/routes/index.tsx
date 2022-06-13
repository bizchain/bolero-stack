import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare"
import { Link } from "@remix-run/react"
import * as React from "react"
import { SITE_BASE_URL, SITE_LONG_DESC, SITE_NAME } from "~/data/static"
import { getSeoLinks, getSeoMeta } from "~/seo"

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
	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold underline">
        Hello world!
			</h1>
			<div className="prose">
				<p>hello world</p>
				<button>
					<Link to="/login" className="btn btn-primary">Login</Link>
				</button>
				<blockquote>yes please</blockquote>
			</div>
		</div>
	)
}
