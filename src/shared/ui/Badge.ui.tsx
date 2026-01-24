import { cn } from "@shared/lib/utils";

interface IBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?:
		| "primary"
		| "secondary"
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "accent";
}

export const Badge: React.FC<IBadgeProps> = ({
	children,
	variant = "primary",
	className,
	...props
}) => {
	const baseClass = "badge badge-soft";

	const variants = {
		primary: `badge-primary`,
		secondary: `badge-secondary`,
		success: `badge-success`,
		danger: `badge-danger`,
		warning: `badge-warning`,
		info: `badge-info`,
		accent: `badge-accent`,
	};

	const finalClass = cn(baseClass, variants[variant], className);

	return (
		<div {...props} className={finalClass}>
			{children}
		</div>
	);
};
