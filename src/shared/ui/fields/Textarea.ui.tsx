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
	title: string;
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
		variants[variant],
		error && "textarea-error",
	);

	return (
		<div>
			<label className="label" htmlFor={props.id}>
				<span className="label-text">{title}</span>
			</label>
			<textarea className={className} {...props}></textarea>
		</div>
	);
};
