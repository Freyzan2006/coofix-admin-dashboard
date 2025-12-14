import { PopUpAppearance, SmoothAppearance } from "@shared/ui/animation";
import { Screen } from "@shared/widgets/Screen.component";
import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<Screen>
			<SmoothAppearance>
				<PopUpAppearance>
					<Outlet />
				</PopUpAppearance>
			</SmoothAppearance>
		</Screen>
	);
}
