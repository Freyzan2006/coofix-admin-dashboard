import { Screen } from "@shared/widgets/Screen.component";
import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<Screen>
			<Outlet />
		</Screen>
	);
}
