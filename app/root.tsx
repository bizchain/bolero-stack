import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStyles from "./globalStyles.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Skeleton App 1.14.3",
  viewport: "width=device-width,initial-scale=1",
});

export function links(){
	return [
		{ rel: "stylesheet", href: globalStyles }
	]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
