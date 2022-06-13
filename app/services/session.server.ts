import { createCookieSessionStorage } from "@remix-run/cloudflare"

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_userSession",
		sameSite: "lax",
		path: "/",
		httpOnly: true,
		secrets: ["c5oFyrXfsexMLUo2V"],
		secure: process.env.NODE_ENV === "production",
	},
})

export const { getSession, commitSession, destroySession } = sessionStorage