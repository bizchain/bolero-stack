import useRootDataLoader from "./useRootDataLoader"

export default function useUserPrefs() {
	const data = useRootDataLoader()
	return data?.prefs
}