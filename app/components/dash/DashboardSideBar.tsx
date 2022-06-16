import * as React from "react"

import { Form, useLocation, useNavigate } from "@remix-run/react"

import clsx from "clsx"

import { TMenuItem, TSidebarMenuItem } from "~/types"
import { IconBook, IconCooperation, IconDown, IconSidebarExpanding } from "@bizchain.vn/svg"

function SideLink({ item, className, children, setShowSidebar }: {
	item: TMenuItem
	className?: string
	children: React.ReactNode
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const navigate = useNavigate()

	if (item.external) return <a href={item.slug} className={className}>{children}</a>
	
	return (
		<div
			className={clsx(className, "cursor-pointer")}
			onClick={() => {
				setShowSidebar(false)
				navigate(item.slug)
			}}
		>
			{children}
		</div>
	)
}

/**
 * `sidebarExpanded` is the permenent status of the sidebar
 * and `internalSidebarExpanded` is the temporary state of the sidebar
 * for hover activities, when `onMouseOut`, the state would be restored to value of `sidebarExpanded`
 */
function SideItem({ item, sidebarExpanded, setShowSidebar }: {
	item: TSidebarMenuItem
	sidebarExpanded: boolean
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const location = useLocation()
	const [groupExpanded, setGroupExpanded] = React.useState(false)

	const hasActiveSubLink = item.children
		? item.children.map(i => i.slug).includes(location.pathname)
		: false

	React.useEffect(() => {
		if (hasActiveSubLink && groupExpanded === false) setGroupExpanded(true)
		if (!hasActiveSubLink && groupExpanded === true) setGroupExpanded(false)
		/**
		 * Pay attention: we working with `hasActiveSubLink`, `expand` and `setExpand`
		 * but we force this effect to re-render when `hasActiveSubLink` changed only
		 * because:
		 * 	- when `hasActiveSubLink` changed to `true`, then, we force to `setExpand(true)`
		 * 	- when `hasActiveSubLink` changed to `false`, that means, user move to other group, then force to `setExpand(false)`
		 * =================================
		 * we don't want to mention `expand` for we want to switch it manually
		 * we don't need to mention `setExpand` for it would not be changed
		 */

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasActiveSubLink])

	return (
		<li
			key={item.menuItemId}
			className={clsx(
				item.meta === "padding-top" ? "pt-2" : "",
				item.meta === "padding-bottom" ? "pb-2" : "",
				(item.meta === "border-top" || item.meta === "all")
					? "pt-2 border-t-[1px] border-t-dashBorder" : "",
				(item.meta === "border-bottom" || item.meta === "all")
					? "pb-2 border-b-[1px] border-b-dashBorder" : ""
			)}
		>
			{item.children
				? <>
					<div
						className={clsx(
							"flex items-center justify-between h-10 mt-1",
							(hasActiveSubLink && !sidebarExpanded) ? "bg-gray-100 rounded-l-full" : ""
						)}
					>
						<SideLink item={item.children[0]} className="" setShowSidebar={setShowSidebar}>
							<div className="flex items-center flex-grow">
								<div className="flex items-center justify-center w-14">
									<IconCooperation className="w-5 h-5" />
								</div>
								<span className="flex-grow">
									<span className={clsx("alink", sidebarExpanded ? "block" : "hidden")}>
										{item.title}
									</span>
								</span>
							</div>
						</SideLink>
						<button
							disabled={hasActiveSubLink && groupExpanded}
							className={clsx(
								"flex items-center justify-center h-full py-1 w-9 hover:bg-gray-100",
								(groupExpanded && hasActiveSubLink) ? "bg-gray-100 disabled" : "",
								sidebarExpanded ? "block" : "hidden"
							)}
							onClick={() => { setGroupExpanded(p => !p) }}
						>
							<IconDown
								className={clsx(
									"w-2 h-2 transition-all",
									groupExpanded ? "rotate-180" : "",
									hasActiveSubLink ? "fill-gray-400" : "fill-black"
								)}
							/>
						</button>
					</div>
					<ul
						className={clsx(
							"mb-2 overflow-hidden transition-all pl-7",
							(groupExpanded && sidebarExpanded) ? "opacity-100 h-auto block" : "h-0 hidden"
						)}
					>
						{item.children.map(item => {
							return (
								<li
									key={item.title}
									className={clsx(
										"flex items-center mb-1 h-9",
										location.pathname === item.slug ? "bg-gray-100 rounded-l-full" : ""
									)}
								>
									<SideLink item={item} className="flex items-center" setShowSidebar={setShowSidebar}>
										<span className="w-7"></span>
										<div>
											<div className="w-7"></div>
											<span>
												<span className="alink">
													{item.title}
												</span>
											</span>
										</div>
									</SideLink>
								</li>
							)
						})}
					</ul>
				</>
				: <SideLink item={item} className="mt-1" setShowSidebar={setShowSidebar}>
					<div
						className={clsx(
							"flex items-center h-10",
							location.pathname === item.slug ? "bg-gray-100 rounded-l-full" : ""
						)}
					>
						<div className="flex items-center justify-center w-14">
							<IconBook className="w-5 h-5" />
						</div>
						<span>
							<span className={clsx("alink", sidebarExpanded ? "block" : "hidden")}>
								{item.title}
							</span>
						</span>
					</div>
				</SideLink>}
		</li>
	)
}

type DashboardSideBarProps = {
	items: TSidebarMenuItem[]
	sidebarExpanded: boolean
	isSmallScreen: boolean
	showSidebar: boolean
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * `showSidebar`: represents for the size of the windows
 */
export function DashboardSideBar({
	items,
	sidebarExpanded,
	isSmallScreen,
	showSidebar,
	setShowSidebar
}: DashboardSideBarProps) {
	const location = useLocation()
	const [internalExpanding, setInternalExpanding] = React.useState(sidebarExpanded)

	/**
	 * `sidebarExpanded` is to support user to expand/collapse the sidebar manually
	 * so, whenever user wish to expand/collapse the sidebar,
	 * then, we update the internalExpanding to the same with `sidebarExpanded`
	 */
	React.useEffect(() => {
		setInternalExpanding(sidebarExpanded || isSmallScreen)
	}, [sidebarExpanded, isSmallScreen])

	return (
		<aside
			className={clsx(
				"fixed z-40 overflow-x-auto border-r-[1px] border-dashBorder text-sm bg-white top-16 bottom-0 left-0 scrollbar-transparent",
				isSmallScreen
					? (showSidebar ? "block" : "hidden")
					: "block",
				(internalExpanding || isSmallScreen) ? "w-64" : "w-14",
			)}
		>
			<div className="relative w-full h-full">
				<nav aria-expanded={sidebarExpanded} className="flex flex-col w-full h-full">
					<div
						onMouseOver={() => {
							if (!internalExpanding && !sidebarExpanded) setInternalExpanding(true)
						}}
						onMouseLeave={() => {
							if (internalExpanding && !sidebarExpanded && !isSmallScreen) setInternalExpanding(false)
						}}
					>
						<ul id="menu" className="relative flex-grow mx-0 mt-2 mb-14">
							{items.map(i => {
								return (
									<SideItem
										key={i.menuItemId}
										item={i}
										sidebarExpanded={Boolean(internalExpanding)}
										setShowSidebar={setShowSidebar}
									/>
								)
							})}
						</ul>
					</div>
					<footer className="hidden md:block sticky bottom-0 z-10 mt-auto border-t-[1px] border-t-dashBorder bg-white">
						<Form
							method="post"
							action="/dash"
							className="w-full overflow-hidden text-sm text-black cursor-pointer h-14"
						>
							<input type="hidden" name="sidebarExpanded" value={sidebarExpanded ? "" : "on"} />
							<input type="hidden" name="redirectTo" value={location.pathname} />
							<button
								type="submit"
								name="_action"
								value="setSidebarExpanding"
								className="flex items-center w-full h-full"
							>
								<div className="flex items-center justify-center w-14">
									<IconSidebarExpanding className={clsx("w-5 h-5", sidebarExpanded ? "rotate-180" : "")} />
								</div>
								<span>{sidebarExpanded ? "Collapse sidebar" : ""}</span>
							</button>
						</Form>
					</footer>
				</nav>
			</div>
		</aside>
	)
}