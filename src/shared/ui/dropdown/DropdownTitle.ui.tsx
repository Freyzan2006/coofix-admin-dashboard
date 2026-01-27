interface IDropdownTitleProps {
	children: React.ReactNode;
}

export const DropdownTitle: React.FC<IDropdownTitleProps> = ({ children }) => {
	return <summary className="btn m-1 w-full"> {children}</summary>;
};
