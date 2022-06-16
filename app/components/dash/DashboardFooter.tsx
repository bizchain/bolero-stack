import * as React from "react"

import { Link } from "@remix-run/react"

import clsx from "clsx"

import { TFooterMenuItem, TMenuItem } from "~/types"
import SocialIconsGroup from "../SocialIconsGroup"

function FooterLink({ item: menuItem, className, children }: { item: TMenuItem, className?: string, children: React.ReactNode }) {
	if (menuItem.external)
		return <a href={menuItem.slug} className={clsx("alink", className)}>{children}</a>

	return (
		<Link
			to={menuItem.slug}
			className={clsx("alink", className)}
		>
			{children}
		</Link>
	)
}

export default function DashboardFooter({ items }: { items: TFooterMenuItem[] }) {
	return (
		<footer className="mt-8 border-t-[1px] border-dashBorder">
			<div className="w-full max-w-screen-xl p-8 mx-auto">
				<div className="grid grid-cols-1 gap-4 py-8 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					<div>
						<span className="font-bold">Contact</span>
						<ul className="mt-2 text-sm">
							<li className="mb-2">
								<Link to="" className="alink">Contact support</Link>
							</li>
							<li className="mb-2">
								<Link to="" className="alink">Contact sales</Link>
							</li>
							<li className="mb-2">
								Zalo: <a href="https://zalo.me/bizchain">0-888-00-76-00</a>
							</li>
							<li className="flex items-center">
								<SocialIconsGroup />
							</li>
						</ul>
					</div>
					{items.map(item => (
						<div key={item.title}>
							<span className="font-bold">{item.title}</span>
							<ul className="mt-2 text-sm">
								{item.children.map(i => (
									<li key={i.menuItemId} className="mb-2">
										<FooterLink item={i}>
											{i.title}
										</FooterLink>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	)
}