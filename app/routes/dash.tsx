import * as React from "react"

import { json, redirect } from "@remix-run/cloudflare"

import { Link, Outlet, useCatch, useLoaderData, useLocation, useMatches, useParams } from "@remix-run/react"
import { useMediaQuery } from "usehooks-ts"
import clsx from "clsx"
import invariant from "tiny-invariant"

import { authenticator, routeAuthenticator } from "~/services/auth.server"
import { cookieUserPrefs } from "~/cookies"
import { DASHBOARD_FOOTER_MENU, DASHBOARD_SIDEBAR_MENU } from "~/data/dash.server"
import { DashboardSideBar } from "~/components/dash/DashboardSideBar"
import { SITE_NAME } from "~/data/static"
import DashboardFooter from "~/components/dash/DashboardFooter"
import DashboardHeader from "~/components/dash/DashboardHeader"
import dashStyle from "~/styles/dash.css"

import type { ActionFunction, LoaderFunction, MetaFunction, LinksFunction } from "@remix-run/cloudflare"
import type { TFooterMenuItem, TSidebarMenuItem, User } from "~/types"
import useErrorReport from "~/utils/useErrorReport"
import useTranslate from "~/utils/useTranslate"
import errorBoundaryLangTable from "~/languages/ErrorBoundary"
import ErrorBoundaryComponent from "~/components/ErrorBoundaryComponent"
import { cacheControl } from "@bizchain.vn/utils"

export const meta: MetaFunction = () => {
	return {
		title: `Dashboard Home - ${SITE_NAME}`
	}
}

export const links: LinksFunction = () => {
	return ([
		{ rel: "stylesheet", href: dashStyle}
	])
}

export type TDashDataLoader = {
	/**
	 * Keep track the status of the side bar
	 */
	sidebarExpanded: boolean
	user: User
	SIDEBAR_ITEMS: TSidebarMenuItem[]
	FOOTER_ITEMS: TFooterMenuItem[]
}

export const action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get("Cookie")
	const userPrefs = (await cookieUserPrefs.parse(cookieHeader)) || {}

	const formData = await request.formData()
	const _action = formData.get("_action")
	invariant(typeof _action === "string", "Dash >>> Method Not Allow")

	const sidebarExpanded = Boolean(formData.get("sidebarExpanded"))
	const redirectTo = String(formData.get("redirectTo"))

	switch (_action) {
		case "logout":
			await authenticator.logout(request, { redirectTo: "/login" })
			return null

		case "setSidebarExpanding":
			userPrefs.sidebarExpanded = sidebarExpanded
			return redirect(redirectTo, {
				headers: {
					"Set-Cookie": await cookieUserPrefs.serialize(userPrefs)
				}
			})
		default:
			return null
	}
}

export const loader: LoaderFunction = async ({ request }) => {
	const auth = await routeAuthenticator(request)
	if (auth === null) throw Error("A login is required to access this page!")
	if (auth instanceof Response) return auth

	const cookieHeader = request.headers.get("Cookie")
	const userPrefs = (await cookieUserPrefs.parse(cookieHeader)) || {}

	return json<TDashDataLoader>(
		{
			user: auth,
			sidebarExpanded: Boolean(userPrefs.sidebarExpanded),
			SIDEBAR_ITEMS: DASHBOARD_SIDEBAR_MENU,
			FOOTER_ITEMS: DASHBOARD_FOOTER_MENU,
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

export default function Dashboard() {
	/**
	 * Get static data from `server-side` to feed the UI
	 */
	const { SIDEBAR_ITEMS, FOOTER_ITEMS, sidebarExpanded } = useLoaderData<TDashDataLoader>()

	/**
	 * widthLessThan768 is a duplicate of isSmallScreen
	 * because this value is only correct after everything render
	 * so, it would be incorrect at the `startup` time
	 * this bug is fixed by using intermediate variable named `isSmallScreen`
	 */
	const widthLessThan768 = useMediaQuery("(max-width: 768px)")

	/**
	 * this variable is used `once time` only
	 * to determine the screen size only, at `startup` or `window resize`
	 */
	const [isSmallScreen, setIsSmallScreen] = React.useState(false)

	/**
	 * use `showSidebar` to toggle the sidebar between `hidden` and `block`
	 * `setShowSidebar` to be used in `DashboardHeader` (toggle button)
	 */
	const [showSidebar, setShowSidebar] = React.useState(false)

	React.useEffect(() => {
		setIsSmallScreen(widthLessThan768)
		setShowSidebar(!widthLessThan768)
	}, [widthLessThan768])

	// const context: ContextType = { invoiceSort }

	const params = useParams()
	const matches = useMatches()
	console.log(" printed from Dash >> ",matches)


	return (
		<>
			<div id="Dashboard" className="flex flex-col w-full h-screen">
				<DashboardHeader showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
				<div id="DBody" className="flex flex-grow mt-16">
					<DashboardSideBar
						items={SIDEBAR_ITEMS}
						sidebarExpanded={sidebarExpanded}
						isSmallScreen={isSmallScreen}
						showSidebar={showSidebar}
						setShowSidebar={setShowSidebar}
					/>
					<div
						id="DContent"
						className={clsx(
							"flex flex-col flex-grow transition-all",
							isSmallScreen
								? "ml-0"
								: sidebarExpanded ? "ml-64" : "ml-14"
						)}
					>
						<div id="DContentInner">
							<main className="w-full max-w-screen-xl p-4 mx-auto md:p-8">
								<div id="DBlock">
									<Outlet />
								</div>
							</main>
						</div>
						<DashboardFooter items={FOOTER_ITEMS} />
					</div>
				</div>
			</div>
			{(isSmallScreen && showSidebar)
				? <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-black/20">
					<button
						title="showSidebar"
						className="w-full h-full bg-transparent"
						onClick={() => { setShowSidebar(false) }}
					></button>
				</div> : null}
		</>
	)
}


// export function ErrorBoundary({ error }: { error: Error }) {
// 	// const location = useLocation()
// 	return (
// 		<>
// 			<Block className="flex-grow py-20">
// 				<Block.Fixed className="flex-col">
// 					<DashboardBreadcrumbs linkList={[{ title: "App Error" }]} />
// 					<div className="max-w-screen-xl prose error-container">
// 						<h1>App Error</h1>
// 						<pre className="whitespace-normal">
// 							<code>
// 								{error.message
// 									? error.message
// 									: <div>
// 										<p>Sorry for any incovenience.</p>
// 										<p>An unknown error has just happened. Please try again start again with following options:</p>
// 										<ul className="mt-4 leading-10 list-disc list-inside">
// 											{/* <li><Link className="text-white alink" to={`/${lang}`}>Homepage</Link></li>
// 											<li><Link className="text-white alink" to={`/${lang}/products`}>Products page</Link></li>
// 											<li><Link className="text-white alink" to={`/${lang}/collections`}>Collections page</Link></li>
// 											<li><Link className="text-white alink" to={`/${lang}/search`}>Do a search</Link></li> */}
// 										</ul>
// 										<p>If the error is still persistant. Please go to <Link to="/contact" className="text-white">contact page</Link> to help reporting this error (with all details as much as possible) to us.</p>
// 										<p>Thank you!</p>
// 									</div>}
// 							</code>
// 						</pre>
// 					</div>
// 				</Block.Fixed>
// 			</Block>
// 		</>
// 	)
// }

// export function CatchBoundary() {
// 	const caught = useCatch()
// 	const { lang } = useUserPrefs()
// 	//Page not found
// 	if (caught.status === 404) {
// 		return (
// 			<>
// 				{/* <MiniHeader /> */}
// 				<Block className="flex-grow py-20">
// 					<Block.Fixed className="flex-col">
// 						<DashboardBreadcrumbs linkList={[{ title: "Page not found" }]} />
// 						<div className="mx-auto text-center">
// 							<span className="text-3xl font-bold text-teal-700 sm:text-6xl font-heading">
// 								Error 404
// 							</span>
// 							<h2 className="my-2 text-2xl font-bold sm:text-4xl font-heading text-slate-600">
// 								Something went wrong!
// 							</h2>
// 							<p className="mb-6">Sorry, but we are unable to open this page.</p>
// 							<div className="flex flex-col items-center pt-5 sm:flex-row sm:space-x-4 sm:justify-center">
// 								<Link to={`/${lang}`}>
// 									<button className="px-8 bg-teal-600 border-teal-700 btn hover:bg-teal-800 ">
// 										Go to the Homepage
// 									</button>
// 								</Link>
// 								<Link className="mt-4 font-semibold alink-primary sm:mt-0" to={`/${lang}/products`}>
// 									Browse Products
// 								</Link>
// 							</div>
// 						</div>
// 					</Block.Fixed>
// 				</Block>
// 				{/* <MiniFooter /> */}
// 			</>
// 		)
// 	}

// 	return (
// 		<>
// 			{/* <MiniHeader /> */}
// 			<Block className="flex-grow py-20">
// 				<Block.Fixed className="flex-col">
// 					<div className="max-w-screen-xl prose error-container">
// 						<DashboardBreadcrumbs linkList={[{ title: "Error Code: " + caught.status }]} />
// 						<h1>Error Code: {caught.status}</h1>
// 						<div className="whitespace-normal">
// 							{caught.data
// 								? <code>{JSON.stringify(caught.data, null, 2)}</code>
// 								: <div>
// 									<p>Sorry for any inconvenience.</p>
// 									<p>An error ({caught.status}) has just happened. Please try again start again with the following options:</p>
// 									<ul className="mt-4 leading-10 list-disc list-inside">
// 										<li><Link className="no-underline alink-primary" to={`/${lang}/`}>Homepage</Link></li>
// 										<li><Link className="no-underline alink-primary" to={`/${lang}/products`}>Products page</Link></li>
// 										<li><Link className="no-underline alink-primary" to={`/${lang}/collections`}>Collections page</Link></li>
// 										<li><Link className="no-underline alink-primary" to={`/${lang}/search`}>Do a search</Link></li>
// 									</ul>
// 									<p>If the error is still persistent. Please go to the <a href="https://bizchain.vn/contact" className="no-underline alink-primary">contact page</a> to help report this error (with all details as much as possible) to us.</p>
// 									<p>Thank you!</p>
// 								</div>}
// 						</div>
// 					</div>
// 				</Block.Fixed>
// 			</Block>
// 			{/* <MiniFooter /> */}
// 		</>
// 	)
// }
export function ErrorBoundary({ error }: { error: Error }) {
	return <ErrorBoundaryComponent message={error.message}/>
}

export function CatchBoundary() {
	return <CatchBoundaryComponent message={""} />
}
