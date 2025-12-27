import DashboardLayout from "@app/pages/dashboard/layout";
import { wrapperProtected } from "@modules/auth";

export const dashboardPaths = [
	{
		path: "/dashboard",
		Component: DashboardLayout,
		children: [
			{
				index: true,
				Component: wrapperProtected(() => import("@pages/dashboard/page")),
			},
			{
				path: "users",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/users/page"),
						),
					},
					{
						path: ":userId",
						Component: wrapperProtected(
							() => import("@pages/dashboard/users/[id]/page"),
						),
					},
				],
			},
			{
				path: "products",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/products/page"),
						),
					},
				],
			},
			{
				path: "reviews",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/reviews/page"),
						),
					},
				],
			},
			{
				path: "orders",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/orders/page"),
						),
					},
				],
			},
			{
				path: "categories",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/categories/page"),
						),
					},
				],
			},
			{
				path: "brands",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/brands/page"),
						),
					},
				],
			},
			{
				path: "favorites",
				children: [
					{
						index: true,
						Component: wrapperProtected(
							() => import("@pages/dashboard/favorites/page"),
						),
					},
				],
			},
		],
	},
];
