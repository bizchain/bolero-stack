import * as React from "react"
import { SITE_NAME, SITE_SLOGAN, SITE_URL } from "~/data/static"

export default function EmailOutline({ children }: { children: React.ReactNode }) {
	return (
		<div style={{ padding: "0.5rem", backgroundColor: "transparent" }}>
			<table
				style={{
					border: 0,
					width: "100%",
					paddingTop: "2rem",
					paddingBottom: "2rem"
				}}
			>
				<tr>
					<td style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
						<table style={{ margin: "auto", maxWidth: "600px" }}>
							<tr style={{ padding: 0 }}>
								<td rowSpan={2} style={{ paddingBottom: 0 }}>
									<img
										src={`${SITE_URL}/img/logos/logo-1x.png`}
										alt=""
										style={{
											width: "50px",
											height: "50px",
										}}
									/>
								</td>
								<td style={{ paddingTop: "10px" }}>
									<span
										style={{
											fontWeight: 700,
											fontSize: "2rem",
											lineHeight: "1.5rem",
											display: "block"
										}}
									>{SITE_NAME}</span>
								</td>
							</tr>
							<tr>
								<td style={{ paddingTop: 0 }}>
									<span
										style={{
											fontSize: "0.75rem",
											lineHeight: "0.75rem",
										}}
									>{SITE_SLOGAN}</span>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<div
							style={{
								border: "1px solid #bdbdbd",
								backgroundColor: "rgb(255,255,255)",
								maxWidth: "600px",
								padding: "2rem",
								margin: "auto",
								display: "block"
							}}
						>
							{children}
						</div>
					</td>
				</tr>
				<tr>
					<td style={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "1.5rem" }}>
						<p
							style={{
								fontSize: "0.875rem",
								lineHeight: "1.25rem",
								display: "block"
							}}
						>
							© 2022 - <a href={SITE_URL} target="_blank" rel="noreferrer">
								BizChain Vietnam
							</a>
						</p>
					</td>
				</tr>
			</table>
		</div>
	)
}