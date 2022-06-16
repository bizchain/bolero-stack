import * as React from "react"

import { Link, useLocation, useMatches } from "@remix-run/react"

import { TBreadcrumbs } from "~/types"
import { IconDashboard, IconHome } from "@bizchain.vn/svg"

type BreadcrumbsProps = {
	linkList: TBreadcrumbs[]
}

export default function DashboardBreadcrumbs({ linkList }: BreadcrumbsProps) {
	const breadcrumbs = useMatches()
		.filter(m => m.handle && m.handle.breadcrumb)
		.map(m => m.handle.breadcrumb)
	const rootlocation = useLocation().pathname.split("/")[1]

	//TODO: apply `truncate` to for smallscreen
	return (
		<div id="breadcrumbs" className="pb-4 text-base breadcrumbs">
			<ul>
				<li>
					<Link to={"/" + rootlocation}><IconDashboard className="w-5 h-5"/></Link>
				</li>
				{[...breadcrumbs, ...linkList].map(link => (
					<li key={link.title}>
						{link.icon ? <IconHome className="w-5 h-5"/> : null}
						{link.url ? <Link to={link.url} className="alink !no-underline">{link.title}</Link> : link.title}
					</li>
				))}
			</ul>
		</div>
	)
}