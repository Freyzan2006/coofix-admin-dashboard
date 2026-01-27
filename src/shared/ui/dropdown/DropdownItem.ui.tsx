import { NavLink } from "react-router";

interface IDropdownItemProps {
	children: React.ReactNode;
	icon?: React.ReactNode;
	variant?: "link" | "button";
	onClick?: () => void;
	disabled?: boolean;
	to?: string;
}

export const DropdownItem: React.FC<IDropdownItemProps> = ({
	children,
	icon,
	variant = "link",
	onClick,
	disabled = false,
	to = "",
}) => {
	if (variant === "button") {
		return (
			<li className="menu-item">
				<button
					type="button"
					className="menu-button"
					onClick={onClick}
					disabled={disabled}
				>
					{icon} {children}
				</button>
			</li>
		);
	}

	return (
		<li className="menu-item">
			<NavLink to={to} className="menu-link">
				{icon} {children}
			</NavLink>
		</li>
	);
};
