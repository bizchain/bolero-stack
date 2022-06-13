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