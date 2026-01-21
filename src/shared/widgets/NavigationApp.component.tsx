import { AuthControl } from "@modules/auth";
import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { TableOfContents } from "lucide-react";

export const NavigationApp: React.FC = () => {
	const urlPage = window.location.pathname;

	return (
		<nav className="navbar w-full bg-base-300">
			<label
				htmlFor="my-drawer-4"
				aria-label="open sidebar"
				className="btn btn-square btn-ghost"
			>
				<TableOfContents />
			</label>
			<div className="px-4 flex w-full items-center justify-between">
				<Heading variant="primary">{urlPage}</Heading>
				<Space align="center">
					<ThemeSwitcher variant="secondary" />
					<AuthControl />
				</Space>
			</div>
		</nav>
	);
};
