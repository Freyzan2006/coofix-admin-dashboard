import { Button } from "@shared/ui/Button.ui";
import { NavigationApp } from "./NavigationApp.component";
import { Bolt, House } from "lucide-react";

export const SidebarApp: React.FC = () => {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Navbar */}
				<NavigationApp />
				{/* Page content here */}
				<div className="p-4">Page Content</div>
			</div>

			<div className="drawer-side is-drawer-close:overflow-visible">
				<label
					htmlFor="my-drawer-4"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
					{/* Sidebar content here */}
					<ul className="menu w-full grow">
						{/* List item */}
						<li>
							<Button
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Homepage"
							>
								<House />
								<span className="is-drawer-close:hidden">Homepage</span>
							</Button>
						</li>

						{/* List item */}
						<li>
							<Button
								className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
								data-tip="Settings"
							>
								<Bolt />
								<span className="is-drawer-close:hidden">Settings</span>
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
