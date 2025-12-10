import { cn } from "@shared/lib/utils";

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
	variant?: "primary" | "secondary" | "default";
	title: string;
}

export const Form: React.FC<IFormProps> = ({
	variant = "default",
	title,
	children,
	...props
}) => {
	const baseClass =
		"fieldset bg-base-200 border-base-300 rounded-box border p-4";

	const variants = {
		primary: "fieldset-primary",
		secondary: "fieldset-secondary",
		default: "",
	} as const;

	const className = cn(baseClass, props.className, variants[variant]);

	return (
		<form className={className} {...props}>
			<h2 className="text-2xl">{title}</h2>

			{children}
		</form>
	);
};
