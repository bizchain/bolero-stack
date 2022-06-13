import * as React from "react"

import { useFetcher } from "@remix-run/react"
import { DATE_FORMAT } from "@bizchain.vn/utils"
import dayjs from "dayjs"

export default function useErrorReport(error: Error){
	const errorHandle = useFetcher()

	React.useEffect(()=>{
		errorHandle.submit(
			{
				//DO NOT MODIFY THIS VALUE
				//This used to protect this error report api endpoint
				secret: "ec6h%T^9dvnt^CL5aY",
				error: error.message,
				date: dayjs().format(DATE_FORMAT.FULL)
			},
			{ method: "post", action: "/api/error-report" }
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return null
}