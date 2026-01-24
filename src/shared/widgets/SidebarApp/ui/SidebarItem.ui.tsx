// import { cn } from "@shared/lib/utils";
// import type { LucideIcon } from "lucide-react";
// import { NavLink } from "react-router";

// interface ISidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
// 	to: string;
// 	title: string;
// 	icon: LucideIcon;
// 	className?: string;
// }

// export const SidebarItem: React.FC<ISidebarItemProps> = ({
// 	title,
// 	to,
// 	icon: Icon,
// 	className,
// 	...props
// }) => {
// 	// return (
// 	// 	<li {...props}>
// 	// 		<button
// 	// 			type="button"
// 	// 			className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
// 	// 			data-tip={title}
// 	// 			onClick={action}
// 	// 		>
// 	// 			{icon}
// 	// 			<span className="is-drawer-close:hidden">{title}</span>
// 	// 		</button>
// 	// 	</li>
// 	// );

// 	return (
// 		<li {...props}>
// 			<NavLink
// 				to={to}
// 				className={({ isActive }) =>
// 					cn(
// 						"flex items-center gap-3 p-3 rounded-lg transition-colors",
// 						"is-drawer-close:tooltip is-drawer-close:tooltip-right",
// 						"hover:bg-base-300",
// 						isActive ? "bg-base-300 font-semibold" : "text-base-content",
// 						className,
// 					)
// 				}
// 				data-tip={title}
// 				end={to === "/"}
// 			>
// 				<Icon className="h-5 w-5 flex-shrink-0" />
// 				<span className="is-drawer-close:hidden">{title}</span>
// 			</NavLink>
// 		</li>
// 	);
// };

// SidebarItem.ui.tsx
"use client";

import { cn } from "@shared/lib/utils";
import type { LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";

interface SidebarItemProps {
	to: string;
	title: string;
	icon: LucideIcon;
	collapsed?: boolean;
}

export function SidebarItem({
	to,
	title,
	icon: Icon,
	collapsed,
}: SidebarItemProps) {
	const pathname = useLocation().pathname;
	const isActive = pathname === to || pathname.startsWith(`${to}/`);

	return (
		<li>
			<NavLink
				to={to}
				className={cn(
					"group flex items-center gap-3 px-4 py-3 rounded-lg mx-2 transition-all duration-200",
					"hover:bg-base-300/80 hover:text-primary",
					isActive
						? "bg-primary/10 text-primary font-medium shadow-sm"
						: "text-base-content/80",
					collapsed && "justify-center px-2",
				)}
			>
				<Icon
					className={cn(
						"shrink-0 transition-transform duration-200",
						isActive && "scale-110",
						collapsed ? "h-6 w-6" : "h-5 w-5",
					)}
				/>

				{!collapsed && (
					<span className="text-sm truncate transition-opacity duration-200 group-hover:opacity-100">
						{title}
					</span>
				)}
			</NavLink>
		</li>
	);
}
