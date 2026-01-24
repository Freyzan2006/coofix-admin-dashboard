import img from "@assets/logo.png";
import { cn } from "@shared/lib/utils";

interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "primary" | "secondary";
}

export const Logo: React.FC<ILogoProps> = ({
	variant = "primary",
	className,
	...props
}) => {
	const baseClasses = "w-24 h-24 flex items-center justify-center";

	const variants = {
		primary: "",
		secondary: "",
	};

	const finalClasses = cn(baseClasses, variants[variant], className);

	return (
		<div {...props} className={finalClasses}>
			<img src={img} alt="Logo" />
		</div>
	);
};
