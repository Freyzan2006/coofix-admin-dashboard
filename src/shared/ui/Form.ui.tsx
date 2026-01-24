import { cn } from "@shared/lib/utils";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	variant?: "default" | "primary" | "secondary" | "card";
	title?: string;
	description?: string;
	className?: string;
	childrenClassName?: string;
}

export const Form: React.FC<FormProps> = ({
	variant = "default",
	title,
	description,
	children,
	className,
	childrenClassName,
	...props
}) => {
	const baseStyles = cn(
		"w-full max-w-md mx-auto",
		"bg-base-100 rounded-2xl shadow-xl border border-base-200",
		"p-6 md:p-8 transition-all duration-300",
		"hover:shadow-2xl",
	);

	const variantStyles = {
		default: "",
		primary: "border-primary/30 bg-gradient-to-br from-primary/5 to-base-100",
		secondary:
			"border-secondary/30 bg-gradient-to-br from-secondary/5 to-base-100",
		card: "backdrop-blur-sm bg-base-100/80 border-base-300/50 shadow-2xl",
	};

	return (
		<form
			className={cn(baseStyles, variantStyles[variant], className)}
			{...props}
		>
			{(title || description) && (
				<div className="text-center mb-8">
					{title && (
						<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-base-content">
							{title}
						</h2>
					)}
					{description && (
						<p className="mt-2 text-base-content/70">{description}</p>
					)}
				</div>
			)}

			<div className={cn("space-y-6", childrenClassName)}>{children}</div>
		</form>
	);
};
