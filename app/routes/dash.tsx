import * as React from "react"
import type { MetaFunction } from "@remix-run/cloudflare"

import { getSeoMeta } from "~/seo"
import { SITE_LONG_DESC, SITE_NAME } from "~/data/static"

export const headers = () => {
	return {
		"Cache-Control": "max-age=300, stale-while-revalidate=60"
	}
}

export const meta: MetaFunction = () => {
	const seoMeta = getSeoMeta({
		bypassTemplate: true,
		title: `Dashboard - ${SITE_NAME}`,
		description: SITE_LONG_DESC
	})
	return ({ ...seoMeta })
}

export default function DashRoute(){
	return (
		<div title="a" id="b" className="dd">
			DashRoute
		</div>
	)
}