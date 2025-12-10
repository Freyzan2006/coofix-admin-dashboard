import { cn } from "@shared/lib/utils";

interface IAlertProps extends React.HTMLAttributes<HTMLDivElement> {
	variant: "primary" | "secondary" | "success" | "danger";
}

export const Alert: React.FC<IAlertProps> = ({
	variant = "primary",
	...props
}) => {
	const baseClass = "alert";

	const variants = {
		primary: "alert-primary",
		secondary: "alert-secondary",
		success: "alert-success",
		danger: "alert-error",
	} as const;

	const className = cn(baseClass, props.className, variants[variant]);

	return (
		<div {...props} className={className}>
			{props.children}
		</div>
	);
};
