import * as React from "react"

import { Link, Outlet } from "@remix-run/react"
import invariant from "tiny-invariant"

import { SITE_NAME } from "~/data/static"
import useUser from "~/utils/useUser"
import { routeAuthenticator } from "~/services/auth.server"

import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
	return {
		title: `User Profile - ${SITE_NAME}`
	}
}

// export const headers: HeadersFunction = ({ loaderHeaders }) => {
// 	return {
// 		"Cache-Control": loaderHeaders.get("Cache-Control") ?? ""
// 	}
// }

export const loader: LoaderFunction = async ( {request} ) => {
	await routeAuthenticator(request)
	return null
}

export default function Profile() {
	const { user } = useUser()
	return (
		<div>
			<header>
				<h1 className="pb-0 text-2xl font-bold">Profile</h1>
			</header>

			<div className="flex flex-col md:flex-row my-4 border-[1px] border-dashBorder rounded-md">
				<div className="flex flex-col p-4 lg:p-8 w-full md:w-[60%] lg:w-[70%]">
					<h2 className="mb-2 text-xl font-semibold">{user?.Name}</h2>
					<div className="flex items-center">
						<span className="mr-1">{user?.email}</span>
						<span>({user?.status})</span>
					</div>
				</div>
				<div className="flex items-center md:border-l-[1px] border-l-dashBorder justify-center p-4 lg:p-8 w-full md:w-[40%] lg:w-[30%] bg-dashGrayBackground">
					<button className="btn-dashLink-disabled whitespace-nowrap" disabled>
						Change Email Address
					</button>
				</div>
			</div>
			<Outlet />
		</div>
	)
}