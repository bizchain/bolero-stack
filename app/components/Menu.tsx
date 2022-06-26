import * as React from "react"

import { Dialog, Transition } from "@headlessui/react"
import { motion } from "framer-motion"

import MenuButton from "./MenuButton"
import menuLangTable from "~/languages/Menu"
import NavLink from "./NavLink"
import useTranslate from "~/utils/useTranslate"

import type { TMenuItem } from "~/types"

const menuList = [
	{
		menuItemId: "home",
		title: "home",
		slug: "/",
	},
	{
		menuItemId: "sample-page",
		title: "sample-page",
		slug: "/sample-page",
	},
	{
		menuItemId: "about-us",
		title: "about-us",
		slug: "/about-us",
	},
	{
		menuItemId: "login",
		title: "login",
		slug: "/login",
	}
]

export function MobileMenu({ buttonColor, className }: { buttonColor?: string, className?: string }) {
	const { t } = useTranslate([menuLangTable])

	const [isOpen, setIsOpen] = React.useState(false)
	function closeModal() { setIsOpen(false) }
	function openModal() { setIsOpen(true) }

	return (
		<motion.div
			className={className ?? ""}
			whileHover={{ scale: 1.2 }}
		>
			<MenuButton
				isOpen={isOpen}
				onClick={openModal}
				strokeWidth="4"
				color={buttonColor ?? "#d97706"}
				transition={{ ease: "easeOut", duration: 0.2 }}
				width={25}
				height={14}
				style={{
					cursor: "pointer"
				}}
			/>

			<Transition appear show={isOpen} as={React.Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="-left-1/2 opacity-0 scale-95"
								enterTo="left-0 opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="left-0 opacity-100 scale-100"
								leaveTo="-left-1/2 opacity-0 scale-95"
							>
								<Dialog.Panel className="fixed inset-0 p-6 overflow-hidden text-2xl text-left text-white align-middle transition-all transform bg-gradient-to-r from-green-900 to-green-800 xs:p-8 sm:p-10 md:p-14 xs:text-3xl md:text-4xl">
									<Dialog.Title
										as="h3"
										className="flex items-center justify-between font-medium leading-6"
									>
										<span className="hidden sm:block">
											{t("chon-diem-den-cua-ban")}
										</span>
										<span className="sm:hidden">
											{t("menu")}
										</span>
										<button
											title="Close"
											type="button"
											onClick={closeModal}
											className="btn btn-circle btn-outline"
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
										</button>
									</Dialog.Title>

									<div className="flex py-2 mt-4 mb-10">
										<div className="w-24 mr-4 border-t-4 border-amber-400"></div>
										<div className="w-8 border-t-4 border-amber-400"></div>
									</div>

									<div className="flex justify-center w-full h-full mt-2">
										<ul className="text-center mobileMenu">
											{menuList.map((menuItem) => (
												<motion.li 
													onClick={closeModal}
													key={menuItem.title}
													className="my-4"
													whileHover={{ scale: 1.1, color: "#f8e112" }}
													transition={{ type: "spring", stiffness: 300}}
												>
													<NavLink to={menuItem.slug}>
														{t(menuItem.title)}
													</NavLink>
												</motion.li>
											))}
										</ul>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</motion.div>
	)
}

function MenuItem({ menuItem, className }: { menuItem: TMenuItem, className?: string }) {
	const { t } = useTranslate([menuLangTable])
	const _className = className ?? ""

	if (menuItem.external) return <li><a href={menuItem.slug} className={_className}>{t(menuItem.title)}</a></li>

	return (
		<li>
			<NavLink to={menuItem.slug ?? ""} className={_className}>
				{t(menuItem.title)}
			</NavLink>
		</li>
	)
}

export default function Menu() {
	return (
		<div id="mainMenu" className="hidden lg:flex flex-col items-center w-full h-12 lg:h-[4.5rem] bg-gradient-to-r from-green-800 via-green-900 to-green-700">
			<div className="flex items-center justify-end w-full h-full max-w-screen-xl p-2 pr-8 lg:p-4 lg:justify-center">
				<ul className="flex justify-end space-x-4 text-lg font-semibold text-white lg:justify-center">
					{menuList.map(menuItem => (
						<MenuItem key={menuItem.title} menuItem={menuItem} className="hover:text-yellow-400" />
					))}
				</ul>
			</div>
		</div>
	)
}