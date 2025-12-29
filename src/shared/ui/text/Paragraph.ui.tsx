import { cn } from "@shared/lib/utils";

interface IParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
	variant?: "primary" | "secondary" | "success" | "danger" | "default";
	size?: "sm" | "md" | "lg";
}

export const Paragraph: React.FC<IParagraphProps> = ({
	variant = "primary",
	size = "md",
	children,
	...props
}) => {
	const baseClass = "text-sm";

	const variants = {
		primary: "text-primary",
		secondary: "text-secondary",
		success: "text-success",
		danger: "text-error",
		default: "text-base-content",
	} as const;

	const sizes = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	} as const;

	const className = cn(
		baseClass,
		props.className,
		variants[variant],
		sizes[size],
	);

	return (
		<p {...props} className={className}>
			{children}
		</p>
	);
};
