import * as React from "react"
import EmailOutline from "./EmailOutline"

export default function EmailWelcome({ name }: { name: string }) {
	return (
		<EmailOutline>

			<h1 style={{ fontSize: "1.2rem", lineHeight: "1.5rem" }}>Welcome to BizChain Store</h1>
			<p style={{ marginBottom: "0.5rem" }}>Hey {name},</p>
			<p style={{ marginBottom: "0.5rem" }}>My name is Brian <span style={{ fontStyle: "italic" }}>({"I'm "}a founder of BizChain Vietnam)</span>. We are here to help you build your own websites in minutes and keep on scaling.</p>

			<p style={{ marginBottom: "0.5rem" }}>Want to see how fast you can launch a website? Check out <a href="https://store.bizchain.vn/f/products" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>our products</a> or watch our <a href="https://docs.bizchain.vn/videos" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>videos</a></p>

			<p style={{ marginTop: "1rem", marginBottom: "0.5rem", fontWeight: 600 }}>What you can do with us:</p>
			<ul style={{ marginBottom: "1rem", listStylePosition: "inside", listStyleType: "disc" }}>
				<li>Free 30-minutes <a href="https://bizchain.vn/contact" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>consulting session</a></li>
				<li>Buy our pre-made <a href="https://store.bizchain.vn/f/products" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>serverless web-templates</a></li>
				<li>Get professional support via our <a href="https://bizchain.vn/services" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>maintenance services</a></li>
				<li>Build your web/app <a href="https://bizchain.vn/services" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>on demand</a></li>
				<li><a href="https://store.bizchain.vn/domain" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>Buy your own domains</a> at unbeatable price</li>
				<li>Read high-quality <a href="https://bizchain.vn/blog" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>blogs</a></li>
			</ul>

			<p style={{ marginBottom: "0.5rem" }}>If you have difficulties using our store, please do not hesitate to check our <a href="https://docs.bizchain.vn" target="_blank" rel="noreferrer" style={{ textDecorationLine: "underline" }}>documentations</a>.</p>

			<p style={{ marginBottom: "1rem" }}>Happy day!</p>
			<p style={{ marginBottom: "0.5rem" }}>Cheers,<br /> Brian, Founder @ BizChain</p>

		</EmailOutline>
	)
}