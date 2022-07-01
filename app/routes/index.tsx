import * as React from "react"

import { cacheControl } from "@bizchain.vn/utils"

import { getSeoLinks, getSeoMeta } from "~/seo"
import { SITE_BASE_URL, SITE_LONG_DESC, SITE_NAME, SITE_SHORT_DESC } from "~/data/static"
import Block from "~/components/Block"
import Navigator from "~/components/Navigator"
import SocialIconsGroup from "~/components/SocialIconsGroup"

import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare"

export const headers = () => {
	return {
		"Cache-Control": cacheControl({ 
			browserCache: "5 minutes",
			cdnCache: "1 minutes",
			staleWhileRevalidate: 60
		})
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
		title: `${SITE_NAME} - ${SITE_SHORT_DESC}`,
		description: SITE_LONG_DESC
	})
	return ({ ...seoMeta })
}

export default function Index() {
	// const { t } = useTranslate([indexRouteLangTable])
	return (
		<>
			<Navigator />
			<Block  className="bg-green-300">
				
				<Block.Fixed className="h-24 bg-slate-200">

				</Block.Fixed>

				<Block.Fixed className="p-10 bg-red-200">
					<div>Demo for Social Icons</div>
					<SocialIconsGroup className="w-6 h-6 fill-green-600" spacing={2}/>
					<div>Vertial aligned</div>
					<SocialIconsGroup className="w-10 h-10 fill-orange-700" spacing={4} colAlign/>
				</Block.Fixed>

			</Block>
		</>
	)
}