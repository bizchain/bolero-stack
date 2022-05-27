import { TRootDataLoader } from "~/root"
import { useMatchesData } from "./useMatchesData"

export default function useRootDataLoader(){
	const rootData = useMatchesData("root").data as TRootDataLoader
	// if (rootData === undefined) throw new Error("Location not found")
	return rootData
}