import { Container } from "@shared/ui/Container.ui";
import { Screen } from "@shared/widgets/Screen.component";
import { SidebarApp } from "@shared/widgets/SidebarApp.component";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
	return (
		<Screen>
			<SidebarApp />
			<Container>
				<Outlet />
			</Container>
		</Screen>
	);
}
