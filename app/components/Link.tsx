/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   Link  | 1.0.0                                                   ║ *
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
import { Link as RemixLink, useLocation } from "@remix-run/react"
import type { RemixLinkProps } from "@remix-run/react/components"

/**
 * Use this to general internal link
 * to keep language params if user using other language other than the default language
 */
const Link = React.forwardRef(
	function Link(props: RemixLinkProps, ref: React.Ref<HTMLAnchorElement> | undefined) {
		const location = useLocation()
		const { to, ...otherProps } = props
		return (
			<RemixLink
				{...otherProps}
				to={to + location.search}
				ref={ref}
			/>
		)
	}
)

export default Link