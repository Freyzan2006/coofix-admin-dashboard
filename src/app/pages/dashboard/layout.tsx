import { Container } from "@shared/ui/Container.ui";
import { SidebarApp } from "@shared/widgets/SidebarApp.component";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
	return (
		<div className="w-full flex flex-col min-h-screen">
			<SidebarApp />
			<Container>
				<Outlet />
			</Container>
		</div>
	);
}
