import * as React from "react"
import clsx from "clsx"

type BlockProps = {
	id?: string
	className?: string
	children: React.ReactNode
}

/**
 * `px-4 md:px-7`
 */
function Block({ className, children, ...otherProps }: BlockProps) {
	return (
		<div
			className={clsx("px-4 md:px-7", className)}
			{...otherProps}
		>
			{children}
		</div>
	)
}

function BlockFixed({ className, children, ...otherProps }: BlockProps) {
	return (
		<div
			className={clsx("flex w-full mx-auto max-w-screen-xl", className)}
			{...otherProps}
		>
			{children}
		</div>
	)
}

function BlockInner({ className, children, ...otherProps }: BlockProps) {
	return (
		<Block
			id="InnerBlock"
			className={clsx("py-6 xs:mx-0 xs:px-4 md:py-8 2xl:py-20", className)}
			{...otherProps}
		>
			{children}
		</Block>
	)
}

/**
 * `flex w-full mx-auto 2xl:max-w-screen-xl`
 */
Block.Fixed = BlockFixed

/**
 * Caring about the `padding-top` and `padding-bottom`
 * `py-6 xs:mx-0 xs:px-4 md:py-8 2xl:py-20`
 */
Block.Inner = BlockInner

export default Block