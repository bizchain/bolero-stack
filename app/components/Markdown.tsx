import * as React from "react"

import { marked } from "marked"
import clsx from "clsx"

import type { MarkdownText } from "~/types"

const Markdown = ({
	markdown,
	maxWidth,
	textSize,
	className,
	...props
}: JSX.IntrinsicElements["div"] & {
	markdown: MarkdownText,
	maxWidth?: "md" | "lg" | "xl"
	textSize?: "md" | "lg" | "xl"
}) => {
	return (
		<div
			className={clsx(
				"prose prose-p:my-2 prose-ul:mt-2 prose-li:my-0 text-primary",
				"prose-a:text-secondary prose-a:before:bg-secondary prose-a:no-underline",
				"prose-h1:text-primary prose-h1:mb-6",
				"prose-h2:text-primary prose-h2:mt-10 prose-h2:mb-4",
				"prose-h3:text-primary prose-h3:mt-8",
				"prose-strong:text-primary",
				"prose-blockquote:text-primary",
				"prose-code:bg-gray-200",
				{
					"prose-base": textSize === "md",
					"prose-lg": textSize === "lg" || textSize === undefined,
					"prose-xl": textSize === "xl",
				},
				{
					"max-w-screen-md": maxWidth === "md",
					"max-w-screen-lg": maxWidth === "lg" || maxWidth === undefined,
					"max-w-screen-xl": maxWidth === "xl",
				},
				className
			)}
			dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
			{...props}
		>
		</div>
	)
}

export default Markdown