import { TFooterMenuItem, TSidebarMenuItem } from "~/types"

export const DASHBOARD_SIDEBAR_MENU: TSidebarMenuItem[] = [
	{
		menuItemId: "menuItem1",
		title: "Menu Item 1",
		slug: "/dash/menu-item-1",
	},
	{
		menuItemId: "menuGroup1",
		title: "Menu group 1",
		slug: "",
		meta: "border-bottom",
		children: [
			{
				menuItemId: "menuItem2",
				title: "Menu Item 2",
				slug: "/dash/menu-item-2"
			},
			{
				menuItemId: "menuItem3",
				title: "Menu Item 3",
				slug: "/dash/menu-item-2/dialog"
			}
		]
	},
	{
		menuItemId: "registrar",
		title: "Registrar",
		slug: "",
		meta: "padding-top",
		children: [
			{
				menuItemId: "manage-domains",
				title: "Manage Domains",
				slug: "/dash/domains"
			},
			{
				menuItemId: "transfer-domains",
				title: "Transfer Domains",
				slug: "/dash/domains/transfer"
			},
			{
				menuItemId: "register-domains",
				title: "Register Domains",
				slug: "/dash/domains/register"
			}
		]
	},
	{
		menuItemId: "partner-services",
		title: "Partner Services",
		slug: "",
		meta: "padding-bottom",
		children: [
			{
				menuItemId: "partner-overview",
				title: "Overview",
				slug: "/dash/partners"
			},
			{
				menuItemId: "active-services",
				title: "Active Services",
				slug: "/dash/partners/active-services"
			},
			{
				menuItemId: "inactive-services",
				title: "Inactive Services",
				slug: "/dash/partners/inactive-services"
			}
		]
	},
	{
		menuItemId: "profile",
		title: "Profile",
		slug: "",
		meta: "all",
		children: [
			{
				menuItemId: "personal-info",
				title: "Personal Info",
				slug: "/dash/profile"
			}
		]
	},
]

export const DASHBOARD_FOOTER_MENU: TFooterMenuItem[] = [
	{
		title: "What we do",
		children: [
			{
				menuItemId: "plans",
				title: "Plans",
				slug: "/dash/#plans",
			},
			{
				menuItemId: "overview",
				title: "Overview",
				slug: "/dash/#overview",
			},
			{
				menuItemId: "features",
				title: "Features",
				slug: "/dash/#features",
			},
			{
				menuItemId: "network",
				title: "Network",
				slug: "/dash/#network",
			},
			{
				menuItemId: "app",
				title: "Apps",
				slug: "/dash/#apps",
			}
		]
	},
	{
		title: "Resources",
		children: [
			{
				menuItemId: "blog",
				title: "Blog",
				slug: "/dash/#",
			},
			{
				menuItemId: "case-studies",
				title: "Case studies",
				slug: "/dash/#",
			},
			{
				menuItemId: "partners",
				title: "Partners",
				slug: "/dash/#",
			},
			{
				menuItemId: "customers",
				title: "Customers",
				slug: "/dash/#",
			},
			{
				menuItemId: "api",
				title: "API",
				slug: "/dash/#",
			},
		]
	},
	{
		title: "Support",
		children: [
			{
				menuItemId: "help-center",
				title: "Help center",
				slug: "/dash/#",
			},
			{
				menuItemId: "community",
				title: "Community",
				slug: "/dash/#",
			},
			{
				menuItemId: "system-status",
				title: "System status",
				slug: "/dash/#",
			},
			{
				menuItemId: "videos",
				title: "Videos",
				slug: "/dash/#",
			},
			{
				menuItemId: "trust-n-safety",
				title: "Trust & Safety",
				slug: "/dash/#",
			},
		]
	},
	{
		title: "About us",
		children: [
			{
				menuItemId: "our-team",
				title: "Our team",
				slug: "/dash/#",
			},
			{
				menuItemId: "careers",
				title: "Careers",
				slug: "/dash/#",
			},
			{
				menuItemId: "terms-of-use",
				title: "Term of Use",
				slug: "/dash/#",
			},
			{
				menuItemId: "sub-agreement",
				title: "Self-serve Subscription Agreement",
				slug: "/dash/#",
			},
			{
				menuItemId: "privacy-policy",
				title: "Privacy Policy",
				slug: "/dash/#",
			},
		]
	}
]