import { createCookie } from "@remix-run/cloudflare"

export const cookieUserPrefs = createCookie("user-prefs", {
	maxAge: 31_536_000, // one year
	secure: process.env.NODE_ENV === "production", // secure if in production
	path: "/"
})