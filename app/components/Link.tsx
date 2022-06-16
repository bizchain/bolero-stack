import * as React from "react"
import { Link as RemixLink, useLocation } from "@remix-run/react"
import type { RemixLinkProps } from "@remix-run/react/components"

const Link = React.forwardRef(
	function Link(props: RemixLinkProps, ref: React.Ref<HTMLAnchorElement> | undefined) {
		const location = useLocation()
		const { to, ...otherProps } = props
		return (
			<RemixLink
				{...otherProps}
				to={to + location.search}
				ref={ref}
			/>
		)
	}
)

export default Link