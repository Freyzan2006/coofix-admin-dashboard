import { cn } from "@shared/lib/utils";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant: "primary" | "secondary" | "default";
	error?: string;
	title: string;
}

export const Input: React.FC<IInputProps> = ({
	type = "text",
	variant = "primary",
	error,
	...props
}) => {
	const baseClass = "input validator";

	const variants = {
		primary: "input-primary",
		secondary: "input-secondary",
		default: "",
	} as const;

	const className = cn(
		baseClass,
		props.className,
		variants[variant],
		error && "input-error", // Добавьте класс для ошибки
	);

	return (
		<label className="fieldset">
			<span className="label">{props.title}</span>
			<input type={type} className={className} {...props} />
			{/* Отображаем ошибку, если она есть */}
			{error && <span className=" text-error mt-1 text-sm">{error}</span>}
		</label>
	);
};
