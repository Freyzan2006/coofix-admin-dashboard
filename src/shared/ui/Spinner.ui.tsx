import { cn } from "../lib/utils";

interface LoadingSpinnerProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	fullScreen?: boolean;
	text?: string;
	className?: string;
}

export const Spinner = ({
	size = "md",
	fullScreen = false,
	text = "",
	className,
}: LoadingSpinnerProps) => {
	const sizeClasses = {
		xs: "h-4 w-4",
		sm: "h-6 w-6",
		md: "h-8 w-8",
		lg: "h-12 w-12",
		xl: "h-16 w-16",
	};

	const content = (
		<div className={cn("flex flex-col items-center justify-center", className)}>
			<div
				className={cn(
					"animate-spin rounded-full border-2 border-current border-t-transparent",
					sizeClasses[size],
				)}
			>
				<span className="sr-only">{text}</span>
			</div>
			{text && <p className="mt-2 text-sm text-base-content/70">{text}</p>}
		</div>
	);

	if (fullScreen) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/80 backdrop-blur-sm">
				{content}
			</div>
		);
	}

	return content;
};
