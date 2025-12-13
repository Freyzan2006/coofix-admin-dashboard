import { LayoutDashboard, PackageSearch, UserSearch } from "lucide-react";

export const sideBarLinks = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
	},
	{
		to: "/dashboard/products",
		label: "Products",
		icon: PackageSearch,
	},
	{
		to: "/dashboard/users",
		label: "Users",
		icon: UserSearch,
	},
];

export const footerLinks = [
	{
		title: "Dashboard",
		items: [
			{
				to: "/dashboard",
				label: "Dashboard",
			},
			{
				to: "/dashboard/products",
				label: "Products",
			},
			{
				to: "/dashboard/users",
				label: "Users",
			},
		],
	},
	{
		title: "Company",
		items: [
			{
				to: "/",
				label: "About us",
			},
			{
				to: "/",
				label: "Contact",
			},
			{
				to: "/",
				label: "Jobs",
			},
			{
				to: "/",
				label: "Press kit",
			},
		],
	},
];
