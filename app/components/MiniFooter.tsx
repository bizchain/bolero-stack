import * as React from "react"
import { SITE_NAME } from "~/data/static"

export default function MiniFooter() {
	return (
		<>
			<div className="border-b border-gray-100"></div>
			<p className="py-10 text-sm font-medium text-center text-gray-400 md:pb-16">
				{(new Date()).getFullYear()} © {SITE_NAME}
			</p>
		</>
	)
}