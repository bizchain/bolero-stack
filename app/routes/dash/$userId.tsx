import { json, LoaderFunction } from "@remix-run/cloudflare"
// import { useOutletContext } from "@remix-run/react";
import * as React from "react"

export const loader: LoaderFunction = async ({params}) => {
  
	return json({
		data: "this is from $userId loader"
	})
}

export default function User(){
	// const { invoiceSort } = useOutletContext<ContextType>();

	return (
		<div>
			User route
		</div>
	)
}