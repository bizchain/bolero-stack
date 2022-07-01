/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   useErrorReport  | 1.0.0                                         ║ *
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