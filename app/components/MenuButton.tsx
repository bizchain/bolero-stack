/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║   MenuButton  | 1.0.0                                             ║ *
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
import { motion, Transition, SVGMotionProps } from "framer-motion"

interface Props extends SVGMotionProps<unknown> {
	isOpen?: boolean
	color?: string
	strokeWidth?: string | number
	transition?: Transition
	lineProps?: any
	width: number
	height: number
}

const MenuButton = ({
	color = "#000",
	height = 24,
	isOpen = false,
	lineProps,
	strokeWidth = 1,
	transition,
	width = 24,
	...props
}: Props) => {
	const variant = isOpen ? "opened" : "closed"
	const top = {
		closed: { rotate: 0, translateY: 0 },
		opened: { rotate: 45, translateY: 2 }
	}
	const center = {
		closed: { opacity: 1 },
		opened: { opacity: 0 }
	}
	const bottom = {
		closed: { rotate: 0, translateY: 0 },
		opened: { rotate: -45, translateY: -2 }
	}
	lineProps = {
		animate: variant,
		initial: "closed",
		stroke: color,
		strokeWidth: strokeWidth as number,
		transition,
		vectorEffect: "non-scaling-stroke",
		...lineProps
	}
	const unitHeight = 4
	const unitWidth = (unitHeight * (width as number)) / (height as number)

	return (
		<motion.svg
			height={height}
			overflow="visible"
			preserveAspectRatio="none"
			viewBox={`0 0 ${unitWidth} ${unitHeight}`}
			width={width}
			{...props}
		>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="0"
				y2="0"
				variants={top}
				{...lineProps}
			/>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="2"
				y2="2"
				variants={center}
				{...lineProps}
			/>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="4"
				y2="4"
				variants={bottom}
				{...lineProps}
			/>
		</motion.svg>
	)
}

export default MenuButton
