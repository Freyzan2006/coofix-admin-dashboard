import { cn } from "@shared/lib/utils";

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "primary" | "secondary" | "accent" | "neutral";
	error?: string;
	title: string;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
	variant = "primary",
	error,
	title,
	...props
}) => {
	const baseClass = "checkbox";

	const variants = {
		primary: "checkbox-primary",
		secondary: "checkbox-secondary",
		accent: "checkbox-accent",
		neutral: "checkbox-neutral",
	} as const;

	const className = cn(
		baseClass,
		props.className,
		variants[variant],
		error && "checkbox-error",
	);

	return (
		<label className="flex items-center gap-2">
			<input type="checkbox" {...props} className={className} />
			<span>{title}</span>
			{error && <span className=" text-error mt-1 text-sm">{error}</span>}
		</label>
	);
};
