import { cn } from "@shared/lib/utils";

interface IStrongProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant: "info" | "danger" | "success" | "warning";
}

export const Strong: React.FC<IStrongProps> = ({
	variant = "info",
	...props
}) => {
	const baseClass = "font-bold";

	const variants = {
		info: "text-info",
		danger: "text-error",
		success: "text-success",
		warning: "text-warning",
	} as const;

	const className = cn(baseClass, props.className, variants[variant]);

	return (
		<strong className={className} {...props}>
			{props.children}
		</strong>
	);
};
