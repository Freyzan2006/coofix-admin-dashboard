// import { sideBarLinks } from "@app/routing/config.routing";
// import { Space } from "@shared/ui/Space.ui";
// import { useMemo } from "react";
// import { SidebarItem } from "./SidebarItem.ui";

// export const SidebarContent: React.FC = () => {
// 	const renderItems = useMemo(() => {
// 		return sideBarLinks.map(({ to, label, icon }) => (
// 			<SidebarItem key={to} to={to} title={label} icon={icon} />
// 		));
// 	}, []);

// 	return (
// 		<aside className="drawer-side is-drawer-close:overflow-visible">
// 			<label
// 				htmlFor="my-drawer-4"
// 				aria-label="close sidebar"
// 				className="drawer-overlay"
// 			></label>
// 			<Space
// 				axis="vertical"
// 				align="start"
// 				className="min-h-full bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"
// 			>
// 				<ul className="menu w-full grow">{renderItems}</ul>
// 			</Space>
// 		</aside>
// 	);
// };

// SidebarContent.ui.tsx
"use client";

import { sideBarLinks } from "@app/routing/config.routing";
import { Logo } from "@modules/common";
import { cn } from "@shared/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SidebarItem } from "./SidebarItem.ui";

export const SidebarContent: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const renderItems = useMemo(() => {
		return sideBarLinks.map(({ to, label, icon }) => (
			<SidebarItem
				key={to}
				to={to}
				title={label}
				icon={icon}
				collapsed={isCollapsed}
			/>
		));
	}, [isCollapsed]);

	return (
		<aside
			className={cn(
				"drawer-side z-40 transition-all duration-300 ease-in-out",
				isCollapsed ? "w-16" : "w-64",
				"lg:static lg:w-64 lg:translate-x-0",
				"h-full",
			)}
		>
			<label
				htmlFor="my-drawer-4"
				aria-label="закрыть боковое меню"
				className="drawer-overlay lg:hidden"
			/>

			<div
				className={cn(
					"flex flex-col h-full bg-gradient-to-b from-base-200 to-base-300",
					"border-r border-base-200 shadow-xl",
					"transition-all duration-300",
					isCollapsed && "items-center",
				)}
			>
				{/* Кнопка сворачивания (только на десктопе) */}

				<button
					type="button"
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={cn(
						"btn btn-ghost btn-sm mt-4 mb-2 self-end mx-2 hidden lg:flex",
						isCollapsed && "self-center",
					)}
					title={isCollapsed ? "Развернуть" : "Свернуть"}
				>
					{isCollapsed ? (
						<ChevronRight size={18} />
					) : (
						<>
							<Logo />
							<ChevronLeft size={18} />
						</>
					)}
				</button>

				<div className="flex-1 overflow-y-auto py-2">
					<ul className="menu menu-lg w-full">{renderItems}</ul>
				</div>

				{/* Нижняя часть (можно добавить профиль, выход и т.д.) */}
				<div className="p-4 border-t border-base-200">
					{/* Здесь можно добавить UserAvatar или Logout */}
				</div>
			</div>
		</aside>
	);
};
