import { ToastContainer } from "@shared/ui/toast";
import { Screen } from "@shared/widgets/Screen.component";

import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<Screen>
			<ToastContainer />
			<Outlet />
		</Screen>
	);
}
