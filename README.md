# Welcome to Bolero-Stack!

Bolero Stack is a `Remix Stack` for deploying to Cloudflare Pages used by BizChain Labs internally.

## Features

We build this stack from ground up to be used by BizChain Labs. Starting from basic-package for `cloudflare-pages`

Features

- Target platform to deploy: Cloudflare Pages
- Authentication using `remix-auth` (implemented `emailPasswordStrategy`)
- Custom Notion API library (we don't use notion-sdk-js)
- TailwindCSS and all its plugins
- Headless Editor `tiptap`
- Notifications system `react-hot-toast`
- NProgress https://github.com/rstacruz/nprogress

## Usage

To use this stack, run following command line

```
npx create-remix@latest --template bizchain/bolero-stack
```

For developement, just run following command line

```
npm run dev
```

## Reference

### Some TailwindCSS Libraries
- https://github.com/mdbootstrap/Tailwind-Elements/
- https://github.com/xtendui/xtendui
- https://github.com/Microwawe/mamba-ui
- https://github.com/merakiui/merakiui
- https://github.com/markmead/hyperui
- https://github.com/enochndika/kimia-UI