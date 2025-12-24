import { paths } from "@app/routing/paths.routing";
import type React from "react";
import type { PropsWithChildren } from "react";

import { createBrowserRouter, RouterProvider } from "react-router";

export const RouterAppProvider: React.FC<PropsWithChildren> = () => {
	const router = createBrowserRouter(paths);

	return <RouterProvider router={router} />;
};
