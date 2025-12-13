import type React from "react";
import { cn } from "@shared/lib/utils";

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	align?: "start" | "center" | "end" | "between";
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
	children,
	className,
	align = "end",
	...props
}) => {
	const alignClasses = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
	};

	return (
		<div
			className={cn(
				"flex items-center gap-3 mt-6",
				alignClasses[align],
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
