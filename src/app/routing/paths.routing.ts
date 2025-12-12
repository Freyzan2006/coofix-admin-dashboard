import AuthLayout from "@pages/auth/layout";
import RootLayout from "@pages/layout";
import DashboardLayout from "@pages/dashboard/layout";
import { lazy } from "react";
import type { RouteObject } from "react-router";
import NotFoundPage from "@app/pages/not-found";

export const paths: RouteObject[] = [
	{
		Component: RootLayout,
		children: [
			{
				path: "/",
				Component: lazy(() => import("@pages/page")),
			},
			{
				path: "/auth",
				Component: AuthLayout,
				children: [
					{
						path: "login",
						Component: lazy(() => import("@pages/auth/login/page")),
					},
				],
			},
			{
				path: "/dashboard",
				Component: DashboardLayout,
				children: [
					{
						index: true,
						Component: lazy(() => import("@pages/dashboard/page")),
					},
					{
						path: "users",
						children: [
							{
								index: true,
								Component: lazy(() => import("@pages/dashboard/users/page")),
							},
							{
								path: ":userId",
								Component: lazy(
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
								Component: lazy(() => import("@pages/dashboard/products/page")),
							},
						],
					},
				],
			},
			{
				path: "*",
				Component: NotFoundPage,
			},
		],
	},
];
