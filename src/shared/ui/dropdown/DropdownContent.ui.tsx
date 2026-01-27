import type { DropdownItem } from "./DropdownItem.ui";

type DropdownChild = React.ReactElement<typeof DropdownItem>;

interface IDropdownProps {
	children: DropdownChild | DropdownChild[];
}

export const DropdownContent: React.FC<IDropdownProps> = ({ children }) => {
	return (
		<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm w-full">
			{children}
		</ul>
	);
};
