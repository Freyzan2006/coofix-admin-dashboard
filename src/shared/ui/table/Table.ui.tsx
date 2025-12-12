import { cn } from "@shared/lib/utils";

interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
	variant?: "primary" | "secondary";
}

export const Table: React.FC<ITableProps> = ({
	variant = "primary",
	children,
	...props
}) => {
	const baseClass = "table";

	const variants = {
		primary: "rounded-box border border-base-content/5 bg-base-100",
		secondary: "",
	} as const;

	const className = cn(baseClass, props.className, variants[variant]);

	return (
		<div className="overflow-x-auto">
			<table className={className} {...props}>
				{children}
			</table>
		</div>
	);
};
