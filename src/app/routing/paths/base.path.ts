import { wrapperProtected } from "@modules/auth";
import { environmentConfig } from "@shared/config";
import type { RouteObject } from "react-router";

export const basePaths: RouteObject[] = [
	{
		path: "*",
		Component: wrapperProtected(() => import("@pages/not-found")),
	},
];

environmentConfig.get("VITE_MODE_APP") === "dev" &&
	basePaths.push({
		path: "/devtools",
		Component: wrapperProtected(() => import("@pages/devtools/page")),
	});
