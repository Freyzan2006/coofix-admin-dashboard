import type React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	type RouteObject,
} from "react-router";

interface IRouterAppProviderProps {
	paths: RouteObject[];
}

export const RouterAppProvider: React.FC<IRouterAppProviderProps> = ({
	paths,
}) => {
	const router = createBrowserRouter(paths);

	return <RouterProvider router={router} />;
};
