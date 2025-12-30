import AuthLayout from "@app/pages/auth/layout";
import { wrapperPublicOnly } from "@modules/auth";
import type { RouteObject } from "react-router";

export const authPaths: RouteObject[] = [
	{
		path: "/auth",
		Component: AuthLayout,
		children: [
			{
				path: "login",
				Component: wrapperPublicOnly(
					() => import("@pages/auth/login/page")
				),
			},
		],
	},
];
