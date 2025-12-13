import React from "react";
import { cn } from "@shared/lib/utils";
import { useModal } from "./useModal.hook";

interface ModalCloseProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	children?: React.ReactNode;
}

export const ModalClose: React.FC<ModalCloseProps> = ({
	asChild = false,
	children,
	className,
	onClick,
	...props
}) => {
	const { closeModal } = useModal();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		onClick?.(e);
		closeModal();
	};

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children, {
			onClick: handleClick,
			...props,
		} as React.ButtonHTMLAttributes<HTMLButtonElement>);
	}

	return (
		<button
			type="button"
			className={cn("btn", className)}
			onClick={handleClick}
			{...props}
		>
			{children || "Закрыть"}
		</button>
	);
};
