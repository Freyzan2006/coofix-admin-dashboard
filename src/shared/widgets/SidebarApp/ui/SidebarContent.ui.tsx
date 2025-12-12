import { Bolt, House } from "lucide-react";
import { SidebarItem } from "./SidebarItem.ui";

export const SidebarContent: React.FC = () => {
	return (
		<div className="drawer-side is-drawer-close:overflow-visible">
			<label
				htmlFor="my-drawer-4"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
				<ul className="menu w-full grow">
					<SidebarItem title="Homepage" icon={<House />} action={() => {}} />

					<SidebarItem title="Settings" icon={<Bolt />} action={() => {}} />
				</ul>
			</div>
		</div>
	);
};
