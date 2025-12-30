import { wrapperProtected } from "@modules/auth";
import type { RouteObject } from "react-router";

export const basePaths: RouteObject[] = [
	{
		path: "*",
		Component: wrapperProtected(() => import("@pages/not-found")),
	},
];
