import { useMatchesById } from "./useMatchesById"
import { DEFAULT_LANGUAGE } from "~/data/static"
import type { TRootDataLoader } from "~/root"
import type { TDashDataLoader } from "~/routes/dash"

export default function useUserPrefs() {
	const rootData = useMatchesById("root").data as TRootDataLoader
	const dashData = useMatchesById("route/dash").data as TDashDataLoader
	return ({
		lang: rootData?.lang ?? DEFAULT_LANGUAGE,
		sidebarExpanded: dashData?.sidebarExpanded
	})
}