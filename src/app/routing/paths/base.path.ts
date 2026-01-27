import { wrapperProtected } from "@modules/auth";
import { settingConfig } from "@shared/config";
import type { RouteObject } from "react-router";

export const basePaths: RouteObject[] = [];

if (settingConfig.mode() === "dev") {
	basePaths.push({
		path: "/devtools",
		Component: wrapperProtected(() => import("@pages/devtools/page")),
	});
}

basePaths.push({
	path: "*",
	Component: wrapperProtected(() => import("@pages/not-found")),
});
