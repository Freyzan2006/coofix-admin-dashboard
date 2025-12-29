import { cn } from "@shared/lib/utils";

interface IStrongProps extends React.HTMLAttributes<HTMLElement> {
	variant?: "info" | "success" | "warning" | "danger";
}

export const Strong: React.FC<IStrongProps> = ({
	variant = "info",
	children,
	...props
}) => {
	const variants = {
		info: "text-info",
		success: "text-success",
		warning: "text-warning",
		danger: "text-error",
	} as const;

	const classNames = cn(props.className, variants[variant]);

	return (
		<strong {...props} className={classNames}>
			{children}
		</strong>
	);
};
