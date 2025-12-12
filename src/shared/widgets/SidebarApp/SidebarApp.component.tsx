import type { PropsWithChildren } from "react";
import { SidebarContent } from "./ui/SidebarContent.ui";
import { NavigationApp } from "../NavigationApp.component";

export const SidebarApp: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				<NavigationApp />
				{children}
			</div>

			<SidebarContent />
		</div>
	);
};
