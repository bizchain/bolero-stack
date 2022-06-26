/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   SocialIcons  | 1.0.0                                            ║ *
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

import { motion } from "framer-motion"
import clsx from "clsx"

const SocialIconsContext = React.createContext({ className: "" })

type SocialIconProps = {
	url: string
	className?: string
	children: React.ReactNode
}

function SocialItem({ url, children }: SocialIconProps) {
	const { className } = React.useContext(SocialIconsContext)
	return (
		<motion.a
			href={url}
			target="_blank"
			className={`p-[2px] rounded-full flex items-center justify-center ${className}`}
			whileHover={{ scale: 1.2 }}
		>
			{children}
		</motion.a>
	)
}

/**
 * `className` here will be applied to all `SocialIcons.Item`
 */
function SocialIcons({ className, colAlign, spacing, children }: { 
	className?: string
	colAlign?: boolean
	spacing: 2 | 4 | 6
	children: React.ReactNode
}) {
	return (
		<SocialIconsContext.Provider value={{ className: className ?? "" }}>
			<div
				className={clsx(
					"flex items-center",
					{
						"flex-col": colAlign,
						"space-x-2": spacing === 2 && !colAlign,
						"space-x-4": spacing === 4 && !colAlign,
						"space-x-6": spacing === 6 && !colAlign,
						"space-y-2": spacing === 2 && colAlign,
						"space-y-4": spacing === 4 && colAlign,
						"space-y-6": spacing === 6 && colAlign,
					}
				)}
			>
				{children}
			</div>
		</SocialIconsContext.Provider>
	)
}

SocialIcons.Item = SocialItem

export default SocialIcons