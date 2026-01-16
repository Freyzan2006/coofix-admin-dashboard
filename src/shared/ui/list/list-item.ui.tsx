import { cn } from "@shared/lib/utils";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
	variant?: "primary";
}

export const ListItem: React.FC<ListItemProps> = ({
	variant = "primary",
	children,
	...props
}) => {
	const baseClassName = "list-row";

	const className = cn(baseClassName);

	return (
		<li className={className} {...props}>
			{children}
		</li>
	);
};
