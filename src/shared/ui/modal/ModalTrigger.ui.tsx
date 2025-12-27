// // ModalTrigger.tsx

import { cn } from "@shared/lib/utils";
import React from "react";
import { ModalContext } from "./modal.context";

// import { cn } from "@shared/lib/utils";
// import React, { type ReactNode } from "react";
// import { useModal } from "./useModal.hook";

// interface ModalTriggerProps
// 	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
// 	asChild?: boolean;
// 	children: ReactNode;
// }

// export const ModalTrigger: React.FC<ModalTriggerProps> = ({
// 	asChild = false,
// 	children,
// 	className,
// 	onClick,
// 	...props
// }) => {
// 	const { openModal } = useModal();

// 	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
// 		onClick?.(e);
// 		openModal();
// 	};

// 	if (asChild && React.isValidElement(children)) {
// 		return React.cloneElement(children, {
// 			onClick: handleClick,
// 			...props,
// 		} as React.ButtonHTMLAttributes<HTMLButtonElement>);
// 	}

// 	return (
// 		<button
// 			type="button"
// 			className={cn("btn", className)}
// 			onClick={handleClick}
// 			{...props}
// 		>
// 			{children}
// 		</button>
// 	);
// };

interface ModalTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
	children,
	...props
}) => {
	const ctx = React.useContext(ModalContext);
	if (!ctx) throw new Error("ModalTrigger must be used inside Modal");
	return (
		<button
			type="button"
			className={cn("btn", props.className)}
			onClick={ctx.openModal}
			{...props}
		>
			{children}
		</button>
	);
};
