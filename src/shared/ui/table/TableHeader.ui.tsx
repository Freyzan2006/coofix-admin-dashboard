export const TableHeader: React.FC<
	React.HTMLAttributes<HTMLTableCellElement>
> = ({ children }) => {
	return <th>{children}</th>;
};
