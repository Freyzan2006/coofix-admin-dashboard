import { Footer } from "@shared/widgets/Footer.component";
import { Header } from "@shared/widgets/Header.component";
import { Outlet } from "react-router";

export default function AuthLayout() {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
