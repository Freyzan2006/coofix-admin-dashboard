interface ISidebarItemProps extends React.HTMLAttributes<HTMLLIElement> {
	title: string;
	icon?: React.ReactNode;
	action?: () => void;
}

export const SidebarItem: React.FC<ISidebarItemProps> = ({
	title,
	action,
	icon,
	...props
}) => {
	return (
		<li {...props}>
			<button
				type="button"
				className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
				data-tip={title}
				onClick={action}
			>
				{icon}
				<span className="is-drawer-close:hidden">{title}</span>
			</button>
		</li>
	);
};
