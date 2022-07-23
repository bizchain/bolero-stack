/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   SocialIcons  | 1.1.0                                            ║ *
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

import { AiFillFacebook, AiOutlineTwitter, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineYoutube, AiOutlineGithub, AiOutlineGlobal, AiOutlineLink } from "react-icons/ai"
import { SiTiktok, SiHashnode, SiZalo } from "react-icons/si"
import { ImFlickr } from "react-icons/im"

import type { IconProps } from "~/types"

type SocialIconProps = {
	url: string
	children: React.ReactNode
}

function SocialIconWrapper({ url, children }: SocialIconProps) {
	return (
		<motion.a
			href={url}
			target="_blank"
			className="p-[2px] rounded-full flex items-center justify-center"
			whileHover={{ scale: 1.2 }}
		>
			{children}
		</motion.a>
	)
}

function SocialIcons({ className, colAlign, spacing, icons }: {
	/**
	 * className to decorate SocialIcon directly
	 */
	className?: string
	/**
	 * Align the SocialIcons by column or row 
	 */
	colAlign?: boolean
	/**
	 * Spacing between SocialIcons
	 */
	spacing?: 2 | 4 | 6 | 8
	/**
	 * List of your social links 
	 */
	icons: IconProps[]
}) {
	return (
		<div
			className={clsx(
				"flex items-center",
				{
					"flex-col": colAlign,
					"space-x-2": spacing === 2 && !colAlign,
					"space-x-4": (spacing === undefined) || (spacing === 4 && !colAlign),
					"space-x-6": spacing === 6 && !colAlign,
					"space-x-8": spacing === 6 && !colAlign,
					"space-y-2": spacing === 2 && colAlign,
					"space-y-4": spacing === 4 && colAlign,
					"space-y-6": spacing === 6 && colAlign,
					"space-y-8": spacing === 6 && colAlign,
				}
			)}
		>
			{icons.map(icon => {
				switch (icon.name) {
					/**
					 * General
					 */
					case "none":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineLink className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "website":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineGlobal className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					/**
					 * Social
					 */
					case "facebook":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiFillFacebook className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "twitter":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineTwitter className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "instagram":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineInstagram className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "tiktok":
						return (
							<SocialIconWrapper url={icon.url}>
								<SiTiktok className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "youtube":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineYoutube className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "linkedin":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineLinkedin className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "flickr":
						return (
							<SocialIconWrapper url={icon.url}>
								<ImFlickr className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					/**
					 * Developers
					 */
					case "github":
						return (
							<SocialIconWrapper url={icon.url}>
								<AiOutlineGithub className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					case "hashnode":
						return (
							<SocialIconWrapper url={icon.url}>
								<SiHashnode className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)
					/**
					 * Others
					 */
					case "zalo":
						return (
							<SocialIconWrapper url={icon.url}>
								<SiZalo className={className ?? "h-6 w-6 fill-primary"} />
							</SocialIconWrapper>
						)

					default:
						return <></>
				}
			})}

		</div>
	)
}

export default SocialIcons