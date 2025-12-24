import { cn } from "@shared/lib/utils";
import type React from "react";

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	description?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
	title,
	description,
	children,
	className,
	...props
}) => {
	return (
		<div className={cn("mb-6", className)} {...props}>
			{title && (
				<h3 className="text-lg font-semibold leading-6 text-base-content">
					{title}
				</h3>
			)}
			{description && (
				<p className="mt-2 text-sm text-base-content/70">{description}</p>
			)}
			{children}
		</div>
	);
};
