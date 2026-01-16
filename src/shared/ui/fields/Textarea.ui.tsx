import { cn } from "@shared/lib/utils";

interface ITextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?:
		| "primary"
		| "secondary"
		| "neutral"
		| "info"
		| "success"
		| "warning"
		| "error";
	error?: string;
	title?: string;
	fullWidth?: boolean;
}

export const Textarea: React.FC<ITextareaProps> = ({
	variant = "primary",
	error,
	title,
	fullWidth,
	...props
}) => {
	const baseClass = "textarea";

	const variants = {
		primary: "textarea-primary",
		secondary: "textarea-secondary",
		neutral: "textarea-neutral",
		info: "textarea-info",
		success: "textarea-success",
		warning: "textarea-warning",
		error: "textarea-error",
	} as const;

	const className = cn(
		baseClass,
		props.className,
		fullWidth && "w-full",
		error ? "textarea-error" : variants[variant],
	);

	return (
		<label className="fieldset">
			{title && <span className="label">{title}</span>}
			<textarea className={className} {...props}></textarea>
			{error && <span className="label-text-alt text-error">{error}</span>}
		</label>
	);
};
