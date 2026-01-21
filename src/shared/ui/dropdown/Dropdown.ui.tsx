import type { DropdownContent } from "./DropdownContent.ui";
import type { DropdownTitle } from "./DropdownTitle.ui";

type DropdownChildren = [
	React.ReactElement<typeof DropdownTitle>,
	React.ReactElement<typeof DropdownContent>,
];

interface IDropdownProps {
	children: DropdownChildren;
}

export const Dropdown: React.FC<IDropdownProps> = ({ children }) => {
	return <details className="dropdown">{children}</details>;
};
