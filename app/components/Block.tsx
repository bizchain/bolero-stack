/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   Block  | 1.0.0                                                  ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2022                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

import * as React from "react"
import clsx from "clsx"

function Block({ className, children, flexRow, noPadding, ...otherProps }: {
	id?: string
	className?: string
	flexRow?: boolean
	noPadding?: boolean
	children: React.ReactNode
}) {
	return (
		<div
			className={clsx(
				"w-full flex",
				flexRow ? "flex-row" : "flex-col",
				noPadding ? "" : "px-4 md:px-8",
				className,
			)}
			{...otherProps}
		>
			{children}
		</div>
	)
}

/**
 * `flex` applied
 */
function BlockFixed({ className, children, maxWidth, ...otherProps }: {
	id?: string
	className?: string
	maxWidth?: "lg" | "xl" | "2xl"
	children: React.ReactNode
}) {
	return (
		<div
			className={clsx(
				"flex w-full mx-auto max-w-screen-xl",
				{
					"max-w-screen-lg": maxWidth === "lg",
					"max-w-screen-xl": maxWidth === "xl" || maxWidth === undefined,
					"max-w-screen-2xl": maxWidth === "2xl"
				},
				className
			)}
			{...otherProps}
		>
			{children}
		</div>
	)
}
Block.Fixed = BlockFixed

export default Block