import { Link, type LinksProps } from "react-router-dom";
import { cn } from "@shared/lib/utils";

interface IconLinkButtonProps extends React.HTMLAttributes<LinksProps> {
	variant?:
		| "primary"
		| "secondary"
		| "danger"
		| "success"
		| "warning"
		| "ghost"
		| "outline";
	size?: "sm" | "md" | "lg";
	external?: boolean;
	to: string;
}

export const LinkApp = ({
	to,
	external = false,
	size = "md",
	variant = "ghost",
	className,
	title,
	children,
}: IconLinkButtonProps) => {
	const sizeClasses = {
		sm: "link-sm h-8 w-8 p-0",
		md: "h-10 w-10 p-0",
		lg: "link-lg h-12 w-12 p-0",
	};

	const variantClasses = {
		primary: "link-primary",
		secondary: "link-secondary",
		danger: "link-error",
		success: "link-success",
		warning: "link-warning",
		ghost: "link-ghost",
		outline: "link-outline",
	};

	if (external) {
		return (
			<a
				href={to}
				className={cn(
					"link link-hover",
					sizeClasses[size],
					variantClasses[variant],
					className,
				)}
				title={title}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

	return (
		<Link
			to={to}
			className={cn(
				"link link-hover",
				sizeClasses[size],
				variantClasses[variant],
				className,
			)}
			title={title}
		>
			{children}
		</Link>
	);
};
