import * as React from "react"
import EmailOutline from "./EmailOutline"

export default function EmailPasswordUpdateNotification({ name }: { name: string }) {
	return (
		<EmailOutline>
			<h1 style={{ fontSize: "1.2rem", lineHeight: "1.5rem" }}>Hey {name},</h1>
			<p style={{ marginBottom: "0.5rem" }}>The password for your BizChain Store account on https://store.bizchain.vn has successfully been changed.</p>
			<p style={{ marginBottom: "0.5rem" }}>If you did not initiate this change, please contact us immediately.</p>
			<p style={{ marginBottom: "0.5rem" }}>
				If you have any questions, contact the our 
				<a
					href="https://bizchain.vn/contact"
					style={{
						textDecorationLine: "underline"
					}}
				>
					support team
				</a>
			</p>
			<p style={{ marginBottom: "0.5rem" }}>Cheers,<br />
				The BizChain Team</p>
		</EmailOutline>
	)
}