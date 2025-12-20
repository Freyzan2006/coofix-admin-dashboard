import { cn } from "@shared/lib/utils";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "primary" | "secondary" | "default";
	error?: string;
	title: string;
	fullWidth?: boolean;
}

export const Input: React.FC<IInputProps> = ({
	type = "text",
	variant = "primary",
	fullWidth = false,
	error,
	...props
}) => {
	const baseClass = "input validator";

	const variants = {
		primary: "input-primary",
		secondary: "input-secondary",
		default: "input-neutral",
	} as const;

	const className = cn(
		baseClass,
		props.className,
		fullWidth && "w-full",
		variants[variant],
		error && "input-error",
	);

	return (
		<label className="fieldset">
			<span className="label">{props.title}</span>
			<input type={type} {...props} className={className} />
			{error && <span className=" text-error mt-1 text-sm">{error}</span>}
		</label>
	);
};
