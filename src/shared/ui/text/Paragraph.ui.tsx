import { cn } from "@shared/lib/utils";

interface IParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
	variant?: "primary" | "secondary" | "default";
}

export const Paragraph: React.FC<IParagraphProps> = ({
	variant = "default",
	...props
}) => {
	const baseClass = "text-base";

	const variants = {
		primary: "text-primary",
		secondary: "text-secondary",
		default: "text-base-content",
	} as const;

	const className = cn(baseClass, props.className, variants[variant]);

	return (
		<p className={className} {...props}>
			{props.children}
		</p>
	);
};
