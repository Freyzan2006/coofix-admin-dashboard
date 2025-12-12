import { cn } from "@shared/lib/utils";

interface ITableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow: React.FC<ITableRowProps> = ({ ...props }) => {
	const className = cn(props.className);

	return (
		<tr {...props} className={className}>
			{props.children}
		</tr>
	);
};
