/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   NavLink  | 1.0.0                                                ║ *
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
import { NavLink as RemixNavLink, useLocation } from "@remix-run/react"
import type { RemixNavLinkProps } from "@remix-run/react/components"

const NavLink = React.forwardRef(
	function Link(props: RemixNavLinkProps, ref: React.Ref<HTMLAnchorElement> | undefined) {
		const location = useLocation()
		const { to, ...otherProps } = props
		return (
			<RemixNavLink
				{...otherProps}
				rel="prefetch"
				to={to + location.search}
				ref={ref}
			/>
		)
	}
)

export default NavLink