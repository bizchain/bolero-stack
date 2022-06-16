import * as React from "react"
import { SocialIconButton } from "./SocialIconButton"	
import { SocialIconFacebook, SocialIconLinkedIn, SocialIconTwitter } from "@bizchain.vn/svg"

export default function SocialIconsGroup(){
	return (
		<div className="flex items-center space-x-2">
			<SocialIconButton url="https://www.facebook.com" className="bg-indigo-600">
				<SocialIconFacebook />
			</SocialIconButton>
			<SocialIconButton url="https://twitter.com/vBizChain" className="bg-blue-600">
				<SocialIconTwitter />
			</SocialIconButton>
			<SocialIconButton url="https://www.linkedin.com" className="bg-blue-800">
				<SocialIconLinkedIn />
			</SocialIconButton>
		</div>
	)
}