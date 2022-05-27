import { useFetcher } from "@remix-run/react"
import dayjs from "dayjs"
import * as React from "react"
import { DATE_FORMAT } from "~/data/static"

export default function useErrorReport(error: Error){
	const errorHandle = useFetcher()

	React.useEffect(()=>{
		errorHandle.submit(
			{
				secret: "A-Random-String",
				error: error.message,
				date: dayjs().format(DATE_FORMAT.FULL)
			},
			{ method: "post", action: "/error-reporter" }
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return null
}