import * as React from "react"

import { getSeoMeta } from "~/seo"
import { SITE_LONG_DESC, SITE_NAME } from "~/data/static"
import LanguageSwitcher from "~/components/LanguageSwitcher"
import loginLangTable from "~/language/login"
import useModal from "~/components/Modal"
import useTranslate from "~/utils/useTranslate"

import type { MetaFunction } from "@remix-run/cloudflare"

// export const links: LinksFunction = () => {
// 	return [
// 		{ rel: "stylesheet", href: styles }
// 	]
// }

export const headers = () => {
	return {
		"Cache-Control": "max-age=300, stale-while-revalidate=60"
	}
}

export const meta: MetaFunction = () => {
	const seoMeta = getSeoMeta({
		bypassTemplate: true,
		title: `Login page - ${SITE_NAME}`,
		description: SITE_LONG_DESC
	})
	return ({ ...seoMeta })
}

export default function LoginRoute() {
	const { isOpen, closeModal, openModal, Modal } = useModal()
	const { t } = useTranslate(loginLangTable)
	return (
		<>
			<div className="flex justify-end p-10">
				<LanguageSwitcher flagOnly={false} />
			</div>
			<section className="py-24 bg-white md:py-32" style={{ backgroundImage: "url('/img/elements/pattern-white.svg')", backgroundPosition: "center" }}>
				<div className="container px-4 mx-auto">
					<div className="max-w-sm mx-auto">
						<div className="mb-6 text-center">
							<a className="inline-block mb-6" href="#">
								<img className="h-16" src="/img/logos/logo.png" alt="" />
							</a>
							<h3 className="mb-4 text-2xl font-bold md:text-3xl">{t("sign-in-to-your-account")}</h3>
							<p className="text-lg font-medium text-coolGray-500">{t("quick-content-updating")}</p>
						</div>
						<form action="">
							<div className="mb-6">
								<label className="block mb-2 font-medium text-coolGray-800" htmlFor="">{t("email")}</label>
								<input className="block w-full p-3 leading-5 border rounded-lg shadow-md appearance-none text-coolGray-900 border-coolGray-200 placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="email" placeholder="hi@bizchain.vn" />
							</div>
							<div className="mb-4">
								<label className="block mb-2 font-medium text-coolGray-800" htmlFor="">{t("password")}</label>
								<input className="block w-full p-3 leading-5 border rounded-lg shadow-md appearance-none text-coolGray-900 border-coolGray-200 placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="password" placeholder="************" />
							</div>
							<div className="flex flex-wrap items-center justify-end mb-6">
								<div className="w-full my-auto md:w-auto">
									<div
										className="inline-block text-xs font-medium text-blue-500 cursor-pointer hover:text-blue-600"
										onClick={() => { openModal() }}
									>
										{t("forgot-your-password")}
									</div>
								</div>
							</div>
							<a className="inline-block w-full py-3 mb-6 text-base font-medium leading-6 text-center bg-blue-500 rounded-md shadow-sm px-7 text-blue-50 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" href="#">
								{t("sign-in")}
							</a>
						</form>
					</div>
				</div>
			</section>
			<Modal title={t("forgot-password")} isOpen={isOpen} closeModal={closeModal}>
				<p>{t("extra1")}</p>
				<p>{t("extra2")}</p>
			</Modal>
		</>
	)
}