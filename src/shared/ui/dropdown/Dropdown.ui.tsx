import { cn } from "@shared/lib/utils";
import type { DropdownContent } from "./DropdownContent.ui";
import type { DropdownTitle } from "./DropdownTitle.ui";

type DropdownChildren = [
	React.ReactElement<typeof DropdownTitle>,
	React.ReactElement<typeof DropdownContent>,
];

interface IDropdownProps extends React.HTMLAttributes<HTMLDetailsElement> {
	children: DropdownChildren;
	direction?: "left" | "right" | "top" | "bottom";
}

export const Dropdown: React.FC<IDropdownProps> = ({
	children,
	className,
	direction = "bottom",
}) => {
	const directionClass = cn({
		"dropdown-left": direction === "left",
		"dropdown-right": direction === "right",
		"dropdown-top": direction === "top",
		"dropdown-bottom": direction === "bottom",
	});

	const finalClass = cn("dropdown", directionClass, className);
	return <details className={finalClass}>{children}</details>;
};
