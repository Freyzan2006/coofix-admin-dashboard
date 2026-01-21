interface IDropdownItemProps {
	children: React.ReactNode;
	icon?: React.ReactNode;
}

export const DropdownItem: React.FC<IDropdownItemProps> = ({
	children,
	icon,
}) => {
	return (
		<li className="menu-item">
			<div className="menu-link">
				{icon} {children}
			</div>
		</li>
	);
};
