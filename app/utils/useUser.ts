import { useMatchesById } from "./useMatchesById"
import type { TRootDataLoader } from "~/root"

export default function useUser(){
	const rootData = useMatchesById("root").data as TRootDataLoader
	return ({
		user: rootData.user,
		isAdmin: rootData.isAdmin,
		isLoggedIn: rootData.user !== null
	})
}