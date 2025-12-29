import { cn } from "@shared/lib/utils";

interface ILoadingProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: "primary" | "secondary" | "spinner";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Loading: React.FC<ILoadingProps> = ({
	size = "md",
	variant = "primary",
	...props
}) => {
	const baseClass = "loading";

	const sizes = {
		xs: "loading-xs",
		sm: "loading-sm",
		md: "loading-md",
		lg: "loading-lg",
		xl: "loading-xl",
	} as const;

	const variants = {
		primary: "loading-bars",
		secondary: "loading-dots",
		spinner: "loading-spinner",
	} as const;

	const classNames = cn(
		baseClass,
		props.className,
		sizes[size],
		variants[variant],
	);

	return <span {...props} className={classNames} />;
};
