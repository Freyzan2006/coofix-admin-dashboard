import { Footer } from "@shared/widgets/Footer.component";

import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<div className="w-full flex flex-col min-h-screen">
			<Outlet />
			<Footer />
		</div>
	);
}
