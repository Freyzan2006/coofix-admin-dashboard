import { cn } from "@shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "ghost"
		| "danger"
		| "success"
		| "warning";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	loading?: boolean;
	fullWidth?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

export const Button = ({
	className,
	variant = "primary",
	size = "md",
	loading = false,
	fullWidth = false,
	leftIcon,
	rightIcon,
	children,
	disabled,
	type = "button",
	...props
}: ButtonProps) => {
	const baseClasses = "btn font-medium transition-all duration-200 ease-out";

	const variants = {
		primary: "btn-primary",
		secondary: "btn-secondary",
		outline: "btn-outline border-2",
		ghost: "btn-ghost hover:bg-base-200",
		danger: "btn-error",
		success: "btn-success",
		warning: "btn-warning",
	};

	const sizes = {
		xs: "btn-xs min-h-6 h-6 px-2 text-xs",
		sm: "btn-sm min-h-8 h-8 px-3 text-sm",
		md: "min-h-10 h-10 px-4 text-base",
		lg: "btn-lg min-h-12 h-12 px-6 text-lg",
		xl: "min-h-14 h-14 px-8 text-xl",
	};

	const states = {
		loading: "pointer-events-none",
		disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
	};

	const themeAdaptiveStyles = {
		darkAdaptive:
			'[data-theme="dark"]:shadow-lg [data-theme="dark"]:shadow-black/10',
		lightAdaptive:
			'[data-theme="light"]:shadow-sm [data-theme="light"]:shadow-gray-200',
		outlineDark:
			variant === "outline"
				? '[data-theme="dark"]:border-opacity-70 [data-theme="dark"]:hover:border-opacity-100'
				: "",
	};

	return (
		<button
			className={cn(
				baseClasses,
				variants[variant],
				sizes[size],

				themeAdaptiveStyles.darkAdaptive,
				themeAdaptiveStyles.lightAdaptive,
				themeAdaptiveStyles.outlineDark,

				loading && states.loading,
				disabled && "opacity-50 cursor-not-allowed",

				fullWidth && "w-full",

				className,
			)}
			disabled={disabled || loading}
			aria-busy={loading}
			data-loading={loading}
			{...props}
		>
			{loading && <span className="loading loading-spinner loading-xs mr-2" />}

			{!loading && leftIcon && (
				<span className="mr-2 flex items-center">{leftIcon}</span>
			)}

			{children}

			{rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
		</button>
	);
};
