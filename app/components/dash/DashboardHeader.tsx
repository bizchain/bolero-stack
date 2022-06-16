import * as React from "react"

import { Link, useLocation } from "@remix-run/react"

import invariant from "tiny-invariant"

import { IconBook, IconCartOutline, IconDown, IconStore, IconUser, LogoBizchain } from "@bizchain.vn/svg"
import useUserPrefs from "~/utils/useUserPrefs"
import useUser from "~/utils/useUser"

export default function DashboardHeader({ showSidebar, setShowSidebar }: {
	showSidebar: boolean
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {

	const { user, isAdmin } = useUser()
	const { lang } = useUserPrefs()
	const location = useLocation()
	const splitPathName = location.pathname.split("/")
	const isAccessingAdmin = splitPathName[1] === "admin"
	const pathName = splitPathName.slice(2).join("/")
	
	invariant(user, "DashboardHeader >>> User is not logged in")

	return (
		<div id="DHeader" className="fixed z-50 box-content flex items-center justify-between h-16 w-full border-b-[1px] border-dashBorder bg-white">
			<div className="flex items-center h-full">
				<button
					className="flex items-center justify-center w-full h-full p-3 md:hidden border-r-[1px] border-dashBorder"
					onClick={() => { setShowSidebar(p => !p) }}
				>
					{showSidebar
						? <svg className="inline-block w-7 h-7 stroke-black" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M14.34 13.605L8.696 8.023l5.582-5.645-.71-.703-5.583 5.644L2.34 1.737l-.703.711L7.282 8.03 1.7 13.675l.71.703 5.583-5.645 5.644 5.583.703-.711z"></path></svg>
						: <svg className="inline-block w-7 h-7 stroke-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>}
				</button>
				<Link to={isAdmin ? isAccessingAdmin ? "/admin" : "/dash" : "/dash"} className="mx-4 ml-4">
					<LogoBizchain className="h-8 fill-teal-600" />
				</Link>
			</div>
			<ul className="flex items-center h-full mr-2 xs:mr-8">
				{isAdmin
					? isAccessingAdmin
						? <li className="box-content items-center flex-grow hidden h-16 xs:flex hover:bg-gray-100">
							<Link to={"/dash/" + pathName } className="flex items-center flex-grow h-full px-4 py-5 cursor-pointer">
								User URL
							</Link>
						</li>
						: <li className="box-content items-center flex-grow hidden h-16 xs:flex hover:bg-gray-100">
							<Link to={"/admin/" + pathName} className="flex items-center flex-grow h-full px-4 py-5 cursor-pointer">
								Admin URL
							</Link>
						</li>
					: null}
				<li className="box-content items-center flex-grow hidden h-16 xs:flex hover:bg-gray-100">
					<a href="https://docs.bizchain.vn" className="flex items-center flex-grow h-full px-4 py-5 cursor-pointer">
						<IconBook className="w-5 h-4 mr-1" />
						<span className="hidden md:block">Docs</span>
					</a>
				</li>
				<li className="box-content items-center flex-grow hidden h-16 cursor-pointer hover:bg-gray-100 xs:flex">
					<Link to={`/${lang}/products`} className="flex items-center h-full px-4 py-5 space-x-1">
						<IconStore className="w-4 h-4 mr-1" />
						<span className="hidden md:block">Store</span>
					</Link>
				</li>
				<li className="box-content items-center flex-grow hidden h-16 cursor-pointer hover:bg-gray-100 xs:flex">
					<Link to={`/${lang}/cart`} className="flex items-center h-full px-4 py-5 space-x-1">
						<IconCartOutline className="w-4 h-4 mr-1" />
						<span className="hidden md:block">Cart</span>
					</Link>
				</li>
				<li className="box-content flex-grow h-full hover:bg-gray-100">
					<span className="h-full dropdown dropdown-end">
						<label tabIndex={0} className="flex items-center h-full px-4 py-5 space-x-1 cursor-pointer hover:bg-gray-100">
							<IconUser className="w-5 h-5 mr-1" />
							<IconDown className="h-5" />
						</label>
						<ul tabIndex={0} className="w-72 shadow-xl menu menu-compact dropdown-content bg-base-100 border-[1px] border-dashBorderDark">
							{isAdmin
								? isAccessingAdmin
									? <li className="xs:hidden">
										<Link to="/dash" className="flex items-center p-4">
											User Dashboard
										</Link>
									</li>
									: <li className="xs:hidden">
										<Link to="/admin" className="flex items-center p-4">
											Admin Dashboard
										</Link>
									</li>
								: null}
							<li className="border-b-[1px] border-dashBorder">
								<Link
									to="/dash/profile"
									className="p-4"
									onClick={() => {
										if (document.activeElement instanceof HTMLElement) {
											document.activeElement.blur()
										}
									}}
								>
									<div>
										<span>My Profile</span>
										<div className="text-xs">{user?.email}</div>
									</div>
								</Link>
							</li>
							{/* <li className="xs:hidden">
								<Link to={`/${lang}`} className="flex items-center p-4">
									<IconStore className="w-4 h-4 mr-1" />
									Visit Store
								</Link>
							</li>
							<li className="xs:hidden">
								<Link to={`/${lang}/cart`} className="flex items-center p-4">
									<IconCartOutline className="w-4 h-4 mr-1" />
									Shopping Cart
								</Link>
							</li> */}
							<li>
								<Link to="/logout" className="p-4">
									Log Out
								</Link>
							</li>
						</ul>
					</span>
				</li>
			</ul>
		</div >
	)
}