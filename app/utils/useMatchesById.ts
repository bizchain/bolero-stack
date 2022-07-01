/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   useMatchesById  | 1.0.0                                         ║ *
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
import { useMatches } from "@remix-run/react"

/**
 * Get data of a specified `routeId` from `useMatches()`
 * @param {string} id routeId
 * @returns {JSON|undefined} all available data including id, pathname, data, params, handle
 */
export function useMatchesById(id: string) {
	const matchingRoutes = useMatches()

	const route = React.useMemo(
		() => matchingRoutes.find((route) => route.id === id),
		[matchingRoutes, id]
	)
	
	return ({ 
		id: route?.id,
		pathname: route?.pathname,
		data: route?.data,
		params: route?.params,
		handle: route?.handle
	})
}