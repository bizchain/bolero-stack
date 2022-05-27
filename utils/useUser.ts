import useRootDataLoader from "./useRootDataLoader"

export default function useUser(){
	const { user, isAdmin } = useRootDataLoader()
	return ({
		user,
		isAdmin,
		isLoggedIn: user !== null
	})
}