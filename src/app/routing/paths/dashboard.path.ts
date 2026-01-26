import DashboardLayout from "@app/pages/dashboard/layout";
import { wrapperProtected } from "@modules/auth";

export const dashboardPaths = [
	{
		path: "/dashboard",
		Component: DashboardLayout,
		children: [
			{
				path: "analytics",
				Component: wrapperProtected(
					() => import("@pages/dashboard/analytics/page"),
				),
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
		],
	},
];
