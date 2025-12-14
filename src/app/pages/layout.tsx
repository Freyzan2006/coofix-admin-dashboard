import { AuthProvider } from "@modules/auth";
import { Screen } from "@shared/widgets/Screen.component";

import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<Screen>
			<AuthProvider>
				<Outlet />
			</AuthProvider>
		</Screen>
	);
}
