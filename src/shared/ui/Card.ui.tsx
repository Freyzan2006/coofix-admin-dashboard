import { cn } from "@shared/lib/utils";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "primary";
	size?: "sm" | "md" | "lg";
}

export const Card: React.FC<ICardProps> = ({
	variant = "primary",
	size = "md",
	children,
	...props
}) => {
	const baseClass = "card p-3";

	const variants = {
		primary: "card-primary bg-base-300 shadow-xl",
	} as const;

	const sizes = {
		sm: "card-sm",
		md: "card-md",
		lg: "card-lg",
	} as const;

	const className = cn(
		baseClass,
		variants[variant],
		sizes[size],
		props.className,
	);

	return (
		<div {...props} className={className}>
			{children}
		</div>
	);
};
