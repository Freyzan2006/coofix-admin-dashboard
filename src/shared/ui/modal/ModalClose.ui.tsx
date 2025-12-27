import { cn } from "@shared/lib/utils";
import React from "react";
import { ModalContext } from "./modal.context";

interface ModalCloseProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export const ModalClose: React.FC<ModalCloseProps> = ({
	children,
	...props
}) => {
	const ctx = React.useContext(ModalContext);
	if (!ctx) throw new Error("ModalClose must be used inside Modal");
	return (
		<button
			type="button"
			className={cn("btn", props.className)}
			onClick={ctx.closeModal}
			{...props}
		>
			{children}
		</button>
	);
};
