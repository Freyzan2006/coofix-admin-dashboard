import { cn } from "@shared/lib/utils";
import type { ReactElement } from "react";
import type { ListItem } from "./list-item.ui";

// type ListChildren =
//   | ReactElement<ListItemProps>
//   | Array<ReactElement<ListItemProps>>;
//
type ListItemElement = ReactElement<typeof ListItem>;

interface IListProps
	extends Omit<React.HTMLAttributes<HTMLUListElement>, "children"> {
	variant?: "primary" | "secondary";
	fullWidth?: boolean;
	children: ListItemElement | ListItemElement[] | null;
}

export const List: React.FC<IListProps> = ({
	variant = "primary",
	children,
	fullWidth = false,
	...props
}) => {
	const baseClassName = "list";

	const variants = {
		primary: `bg-base-100 rounded-box shadow-md`,
		secondary: `bg-info-content border-base-300 text-base-content rounded-box shadow-md`,
	} as const;

	const className = cn(
		variants[variant],
		baseClassName,
		fullWidth ? "w-full" : "",
		props.className,
	);

	return (
		<ul {...props} className={className}>
			{children}
		</ul>
	);
};
