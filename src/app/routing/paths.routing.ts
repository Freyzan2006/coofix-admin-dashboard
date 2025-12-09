import AuthLayout from "@pages/auth/layout";
import RootLayout from "@pages/layout";
import DashboardLayout from "@pages/dashboard/layout";
import { lazy } from "react";
import type { RouteObject } from "react-router";
import NotFoundPage from "@app/pages/not-found";

const HomePage = lazy(() => import("@pages/page"));
const DashboardPage = lazy(() => import("@pages/dashboard/page"));
const LoginPage = lazy(() => import("@pages/auth/login/page"));
const RegisterPage = lazy(() => import("@pages/auth/register/page"));
const UsersPage = lazy(() => import("@pages/dashboard/users/page"));
const UserDetailPage = lazy(() => import("@pages/dashboard/users/[id]/page"));

export const paths: RouteObject[] = [
	{
		Component: RootLayout,
		children: [
			{
				path: "/",
				Component: HomePage,
			},
			{
				path: "/auth",
				Component: AuthLayout,
				children: [
					{
						path: "login",
						Component: LoginPage,
					},
					{
						path: "register",
						Component: RegisterPage,
					},
				],
			},
			{
				path: "/dashboard",
				Component: DashboardLayout,
				children: [
					{
						index: true,
						Component: DashboardPage,
					},
					{
						path: "users",
						children: [
							{
								index: true,
								Component: UsersPage,
							},
							{
								path: ":userId",
								Component: UserDetailPage,
							},
						],
					},
				],
			},
			{
				path: "*",
				Component: NotFoundPage,
			},
		],
	},
];
