/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   NavLink  | 1.1.1                                                ║ *
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
import { NavLink as RemixNavLink } from "@remix-run/react"
import type { RemixNavLinkProps } from "@remix-run/react/dist/components"
import useLinkGenerator from "~/utils/useLinkGenerator"

const NavLink = React.forwardRef(
	function Link(props: RemixNavLinkProps, ref: React.Ref<HTMLAnchorElement> | undefined) {
		const { to, ...otherProps } = props
		const finalUrl = useLinkGenerator(String(to))

		return (
			<RemixNavLink
				{...otherProps}
				prefetch="intent"
				to={finalUrl}
				ref={ref}
			/>
		)
	}
)

export default NavLink