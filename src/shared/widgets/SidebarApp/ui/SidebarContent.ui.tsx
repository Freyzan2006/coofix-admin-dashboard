import { useMemo } from "react";
import { SidebarItem } from "./SidebarItem.ui";
import { sideBarLinks } from "@app/routing/config.routing";
import { Space } from "@shared/ui/Space.ui";

export const SidebarContent: React.FC = () => {
	const renderItems = useMemo(() => {
		return sideBarLinks.map(({ to, label, icon }) => (
			<SidebarItem key={to} to={to} title={label} icon={icon} />
		));
	}, []);

	return (
		<aside className="drawer-side is-drawer-close:overflow-visible">
			<label
				htmlFor="my-drawer-4"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<Space
				axis="vertical"
				align="start"
				className="min-h-full bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"
			>
				<ul className="menu w-full grow">{renderItems}</ul>
			</Space>
		</aside>
	);
};
