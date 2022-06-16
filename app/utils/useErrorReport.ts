import * as React from "react"

import { useFetcher } from "@remix-run/react"
import { DATE_FORMAT } from "@bizchain.vn/utils"
import dayjs from "dayjs"

import { useMatchesById } from "./useMatchesById"
import { TRootDataLoader } from "~/root"

export default function useErrorReport(message: string, url: string){
	const errorHandle = useFetcher()
	const rootData = useMatchesById("root").data as TRootDataLoader

	React.useEffect(()=>{
		errorHandle.submit(
			{
				//DO NOT MODIFY THIS VALUE
				//This used to protect this error report api endpoint
				secret: "ec6h%T^9dvnt^CL5aY",
				error: message,
				date: dayjs().format(DATE_FORMAT.FULL),
				email: rootData?.user?.email ?? "",
				name: rootData?.user?.Name ?? "",
				url
			},
			{ method: "post", action: "/api/error-report" }
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return null
}