import { useMemo } from "react";
import { SidebarItem } from "./SidebarItem.ui";
import { sideBarLinks } from "@app/routing/config.routing";

export const SidebarContent: React.FC = () => {
	const renderItems = useMemo(() => {
		return sideBarLinks.map(({ to, label, icon }) => (
			<SidebarItem key={to} to={to} title={label} icon={icon} />
		));
	}, []);

	return (
		<div className="drawer-side is-drawer-close:overflow-visible">
			<label
				htmlFor="my-drawer-4"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
				<ul className="menu w-full grow">{renderItems}</ul>
			</div>
		</div>
	);
};
