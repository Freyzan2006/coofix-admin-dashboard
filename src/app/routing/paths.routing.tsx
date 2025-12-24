import { ProtectedRoute } from "@modules/auth";
import AuthLayout from "@pages/auth/layout";
import DashboardLayout from "@pages/dashboard/layout";
import RootLayout from "@pages/layout";
import { lazy } from "react";
import type { RouteObject } from "react-router";

function withProtected(
	importFn: () => Promise<{
		default: React.ComponentType<React.PropsWithChildren>;
	}>,
) {
	const LazyComponent = lazy(importFn);
	return () => (
		<ProtectedRoute>
			<LazyComponent />
		</ProtectedRoute>
	);
}

export const paths: RouteObject[] = [
	{
		Component: RootLayout,
		children: [
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
						Component: withProtected(() => import("@pages/dashboard/page")),
					},
					{
						path: "users",
						children: [
							{
								index: true,
								Component: withProtected(
									() => import("@pages/dashboard/users/page"),
								),
							},
							{
								path: ":userId",
								Component: withProtected(
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
								Component: withProtected(
									() => import("@pages/dashboard/products/page"),
								),
							},
						],
					},
				],
			},
			{
				path: "*",
				Component: withProtected(() => import("@pages/not-found")),
			},
		],
	},
];
