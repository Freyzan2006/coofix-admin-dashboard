import AuthLayout from "@app/pages/auth/layout";
import { wrapperProtected } from "@modules/auth";
import { lazy } from "react";
import type { RouteObject } from "react-router";

export const rootPaths: RouteObject[] = [
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
		path: "*",
		Component: wrapperProtected(() => import("@pages/not-found")),
	},
];
