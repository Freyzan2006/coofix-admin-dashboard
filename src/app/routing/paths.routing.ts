import RootLayout from "@pages/layout";
import type { RouteObject } from "react-router";
import { dashboardPaths } from "./paths/dashboard.path";
import { rootPaths } from "./paths/root.path";

export const paths: RouteObject[] = [
	{
		Component: RootLayout,
		children: [...rootPaths, ...dashboardPaths],
	},
];
