import { cn } from "@shared/lib/utils";

interface SelectItem {
	value: string;
	label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "neutral"
		| "info"
		| "success"
		| "warning"
		| "error";
	error?: string;
	items: SelectItem[];
}

export const Select: React.FC<SelectProps> = ({
	variant = "primary",
	error,
	items,
	className,
	...props
}) => {
	const variants = {
		primary: "select-primary",
		secondary: "select-secondary",
		accent: "select-accent",
		neutral: "select-neutral",
		info: "select-info",
		success: "select-success",
		warning: "select-warning",
		error: "select-error",
	} as const;

	return (
		<div>
			<select
				{...props}
				className={cn(
					"select",
					error ? "select-error" : variants[variant],
					className,
				)}
			>
				{items.map((item) => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			{error && <span className=" text-error mt-1 text-sm">{error}</span>}
		</div>
	);
};
