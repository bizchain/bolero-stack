import * as React from "react"

import { motion } from "framer-motion"
import clsx from "clsx"

type SocialIconButtonProps = {
	url: string
	children: React.ReactNode
	className?: string
}

export function SocialIconButton({ url, children, className }: SocialIconButtonProps) {
	return (
		<motion.a
			href={url}
			target="_blank"
			className={clsx(className, "p-[2px] rounded-full")}
			whileHover={{ scale: 1.2 }}
		>
			{children}
		</motion.a>
	)
}