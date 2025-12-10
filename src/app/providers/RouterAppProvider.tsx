import { paths } from "@app/routing/paths.routing";

import type React from "react";

import { createBrowserRouter, RouterProvider } from "react-router";

export const RouterAppProvider: React.FC = () => {
	const router = createBrowserRouter(paths);

	return <RouterProvider router={router} />;
};
