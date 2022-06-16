import * as React from "react"

import { LogoBizchain } from "@bizchain.vn/svg"
import Block from "./Block"
import LanguageSwitcher from "./LanguageSwitcher"
import Link from "./Link"

export default function MiniHeader() {
	return (
		<Block className="py-4 md:py-8" id="MiniHeader">
			<Block.Fixed className="justify-between">
				<Link to="/">
					<LogoBizchain className="h-8 fill-primaryBgColor" />
				</Link>
				<LanguageSwitcher flagOnly={false} />
			</Block.Fixed>
		</Block>
	)
}