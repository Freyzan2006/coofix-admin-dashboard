import { cn } from "@shared/lib/utils";

interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	variant?: "primary" | "secondary" | "default";
	level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<IHeadingProps> = ({
	children,
	variant = "default",
	level = "h2",
	...props
}) => {
	const baseClass = "text-2xl";

	const variants = {
		primary: "text-primary",
		secondary: "text-secondary",
		default: "text-base-content",
	} as const;

	const className = cn(baseClass, props.className, variants[variant]);

	switch (level) {
		case "h1":
			return (
				<h1 className={className} {...props}>
					{children}
				</h1>
			);
		case "h2":
			return (
				<h2 className={className} {...props}>
					{children}
				</h2>
			);
		case "h3":
			return (
				<h3 className={className} {...props}>
					{children}
				</h3>
			);
		case "h4":
			return (
				<h4 className={className} {...props}>
					{children}
				</h4>
			);
		case "h5":
			return (
				<h5 className={className} {...props}>
					{children}
				</h5>
			);
		case "h6":
			return (
				<h6 className={className} {...props}>
					{children}
				</h6>
			);
		default:
			return (
				<h2 className={className} {...props}>
					{children}
				</h2>
			);
	}
};
