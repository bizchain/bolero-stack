import * as React from "react"

import { AiFillFacebook, AiOutlineTwitter, AiOutlineLinkedin } from "react-icons/ai"

import SocialIcons from "./SocialIcons"

/**
 * className for this component will go direct to `Icons`
 */
export default function SocialIconsGroup({ className, spacing, colAlign }: {
	className?: string
	colAlign?: boolean
	spacing?: 2 | 4 | 6
}){
	return (
		<SocialIcons spacing={spacing ?? 2} colAlign={colAlign} className="p-2 rounded-lg">
			
			<SocialIcons.Item url="https://facebook.com">
				<AiFillFacebook className={className ?? "w-5 h-5 fill-white"}/>
			</SocialIcons.Item>

			<SocialIcons.Item url="https://twitter.com">
				<AiOutlineTwitter className={className ?? "w-5 h-5 fill-white"}/>
			</SocialIcons.Item>

			<SocialIcons.Item url="https://linkedin.com">
				<AiOutlineLinkedin className={className ?? "w-5 h-5 fill-white"}/>
			</SocialIcons.Item>

		</SocialIcons>
	)
}