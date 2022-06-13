import * as React from "react"
import EmailOutline from "./EmailOutline"

export default function EmailResetPassword({ name, link }: { name: string, link: string }) {
	return (
		<EmailOutline>

			<h1 style={{ fontSize: "1.2rem", lineHeight: "1.5rem" }}>Hey {name},</h1>
			<p style={{ marginBottom: "0.5rem" }}>You have received this letter because someone made a password change request on the BizChain Store website.</p>
			<p style={{ marginBottom: "0.5rem" }}>If you never made such a request, ignore this message.</p>

			<div style={{ textAlign: "center" }}>
				<a href={link}>
					<button
						style={{
							padding: "0.75rem",
							textTransform: "uppercase",
							backgroundColor: "rgb(15,118,110)",
							cursor: "pointer",
							borderRadius: "0.25rem",
							color: "rgb(255,255,255)",
							fontWeight: 700,
							marginTop: "1rem",
							marginBottom: "1rem",
							paddingLeft: "1.5rem",
							paddingRight: "1.5rem",
							fontSize: "0.875rem",
							lineHeight: "1.25rem"
						}}
					>
					Reset password
					</button>
				</a>
				<p
					style={{
						fontSize: "0.80rem",
						lineHeight: "1rem",
						fontStyle: "italic",
						marginBottom: "0.5rem"
					}}
				>This link will be active for 06 hours or until the next password reset request.</p>
			</div>

			<p style={{ marginBottom: "0.5rem" }}>
				If you have difficulties restoring password, contact the our 
				<a
					href="https://bizchain.vn/contacts"
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