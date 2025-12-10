import { Footer } from "@shared/widgets/Footer.component";
import { Screen } from "@shared/widgets/Screen.component";

import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<Screen>
			<Outlet />
			<Footer />
		</Screen>
	);
}
