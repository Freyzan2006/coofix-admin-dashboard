import { cn } from "@shared/lib/utils";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

interface ISidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
	to: string;
	title: string;
	icon: LucideIcon;
	className?: string;
}

export const SidebarItem: React.FC<ISidebarItemProps> = ({
	title,
	to,
	icon: Icon,
	className,
	...props
}) => {
	// return (
	// 	<li {...props}>
	// 		<button
	// 			type="button"
	// 			className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
	// 			data-tip={title}
	// 			onClick={action}
	// 		>
	// 			{icon}
	// 			<span className="is-drawer-close:hidden">{title}</span>
	// 		</button>
	// 	</li>
	// );

	return (
		<li {...props}>
			<NavLink
				to={to}
				className={({ isActive }) =>
					cn(
						"flex items-center gap-3 p-3 rounded-lg transition-colors",
						"is-drawer-close:tooltip is-drawer-close:tooltip-right",
						"hover:bg-base-300",
						isActive ? "bg-base-300 font-semibold" : "text-base-content",
						className,
					)
				}
				data-tip={title}
				end={to === "/"}
			>
				<Icon className="h-5 w-5 flex-shrink-0" />
				<span className="is-drawer-close:hidden">{title}</span>
			</NavLink>
		</li>
	);
};
