import { ToastContainer } from "@modules/notification";
import { EnterAnimation } from "@shared/ui/animation";
import { Screen } from "@shared/widgets/Screen.component";

import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<Screen>
			<ToastContainer />
			<EnterAnimation>
				<Outlet />
			</EnterAnimation>
		</Screen>
	);
}
