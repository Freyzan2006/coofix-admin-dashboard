"use client";

import type { PropsWithChildren } from "react";
import { NavigationApp } from "../NavigationApp.component";
import { SidebarContent } from "./ui/SidebarContent.ui";

export const SidebarApp: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

			<div className=" drawer-content flex flex-col min-h-screen">
				<NavigationApp />
				<main className="flex-1 p-4 md:p-6 lg:p-8 bg-base-100">{children}</main>
			</div>

			<SidebarContent />
		</div>
	);
};
