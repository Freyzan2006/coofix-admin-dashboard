import RootLayout from "@pages/layout";
import type { RouteObject } from "react-router";
import { dashboardPaths } from "./paths/dashboard.path";
import { authPaths } from "./paths/auth.path";
import { basePaths } from "./paths/base.path";

export const paths: RouteObject[] = [
	{
		Component: RootLayout,
		children: [
			...basePaths,
			...authPaths, 
			...dashboardPaths
		],
	},
];
