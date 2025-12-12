import { cn } from "@shared/lib/utils";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => {
	const baseClass = cn("container mx-auto my-4 min-h-screen", className);
	return (
		<div {...props} className={baseClass}>
			{children}
		</div>
	);
};
