import { ToastContainer } from "@modules/notification";
import { settingConfig } from "@shared/config";
import { ToDevTools } from "@shared/features/ToDevTools.feature";
import { EnterAnimation } from "@shared/ui/animation";
import { Screen } from "@shared/widgets/Screen.component";

import { Outlet } from "react-router";

export default function RootLayout() {
	const mode = settingConfig.mode();

	return (
		<Screen>
			{mode === "dev" && <ToDevTools />}
			<ToastContainer />
			<EnterAnimation>
				<Outlet />
			</EnterAnimation>
		</Screen>
	);
}
