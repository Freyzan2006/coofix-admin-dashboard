import { TableOfContents } from "lucide-react";

export const NavigationApp: React.FC = () => {
	return (
		<nav className="navbar w-full bg-base-300">
			<label
				htmlFor="my-drawer-4"
				aria-label="open sidebar"
				className="btn btn-square btn-ghost"
			>
				<TableOfContents />
			</label>
			<div className="px-4">Navbar Title</div>
		</nav>
	);
};
