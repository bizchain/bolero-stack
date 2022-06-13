import { initSeo } from "remix-seo"
import { SITE_NAME, SITE_SHORT_DESC, SITE_LONG_DESC } from "./data/static"

/**
 * Default SEO for any pages which has no provided SEO data
 */
export const { getSeo, getSeoMeta, getSeoLinks } = initSeo({
	title: `${SITE_NAME} - ${SITE_SHORT_DESC}`,
	titleTemplate: `%s - ${SITE_NAME}`,
	description: SITE_LONG_DESC
})