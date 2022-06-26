import * as React from "react"

import { getSeoMeta } from "~/seo"
import { SITE_NAME } from "~/data/static"
import Navigator from "~/components/Navigator"
import navigatorLangTable from "~/languages/Navigator"
import useTranslate from "~/utils/useTranslate"

import type { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
	const seoMeta = getSeoMeta({
		bypassTemplate: true,
		title: `Contact ${SITE_NAME}`,
		description: "We offer free initial consultations, so contact us. Our goal is to help you regardless of whether or not you are our client.",
	})
	return ({ ...seoMeta })
}

export default function SamplePageRoute() {
	const { t } = useTranslate([navigatorLangTable])
	return (
		<>
			<Navigator />
			<div className="p-10 bg-red-100">
				<h1>{t("sample-page")}</h1>
			</div>
		</>

	)
}