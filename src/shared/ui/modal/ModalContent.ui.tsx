// import { cn } from "@shared/lib/utils";
// import type React from "react";
// import { useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { useModal } from "./useModal.hook";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Button } from "../Button.ui";
import { ModalContext } from "./modal.context";

// interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
// 	showCloseButton?: boolean;
// 	disableOutsideClick?: boolean;
// 	size?: "sm" | "md" | "lg" | "xl" | "full";
// }

// export const ModalContent: React.FC<ModalContentProps> = ({
// 	children,
// 	className,
// 	showCloseButton = true,
// 	disableOutsideClick = false,
// 	size = "md",
// 	...props
// }) => {
// 	const { isOpen, closeModal } = useModal();
// 	const contentRef = useRef<HTMLDivElement>(null);
// 	const dialogRef = useRef<HTMLDialogElement>(null);

// 	const sizeClasses = {
// 		sm: "max-w-xs",
// 		md: "max-w-md",
// 		lg: "max-w-lg",
// 		xl: "max-w-3xl",
// 		full: "max-w-7xl",
// 	};

// 	// Focus trap для accessibility
// 	useEffect(() => {
// 		if (!isOpen) return;

// 		const focusableElements = contentRef.current?.querySelectorAll(
// 			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
// 		);

// 		if (focusableElements && focusableElements.length > 0) {
// 			(focusableElements[0] as HTMLElement).focus();
// 		}

// 		// Управляем нативным dialog
// 		const dialog = dialogRef.current;
// 		if (dialog) {
// 			dialog.showModal();
// 		}

// 		return () => {
// 			if (dialog) {
// 				dialog.close();
// 			}
// 		};
// 	}, [isOpen]);

// 	if (!isOpen) return null;

// 	return createPortal(
// 		<dialog ref={dialogRef} className="modal modal-open">
// 			<div
// 				ref={contentRef}
// 				className={cn("modal-box", sizeClasses[size], className)}
// 				{...props}
// 			>
// 				{showCloseButton && (
// 					<button
// 						type="button"
// 						onClick={closeModal}
// 						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
// 						aria-label="Закрыть"
// 					>
// 						✕
// 					</button>
// 				)}
// 				<div className="relative">{children}</div>
// 			</div>

// 			{/* Затемнение фона - НЕ кликабельное если disableOutsideClick = true */}
// 			<form method="dialog" className="modal-backdrop">
// 				<button
// 					type="button"
// 					onClick={disableOutsideClick ? undefined : closeModal}
// 				>
// 					close
// 				</button>
// 			</form>
// 		</dialog>,
// 		document.body,
// 	);
// };

interface ModalContentProps {
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
}

export const ModalContent: React.FC<ModalContentProps> = ({
	children,
	size = "md",
}) => {
	const ctx = React.useContext(ModalContext);
	if (!ctx) throw new Error("ModalContent must be used inside Modal");

	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
	};

	return (
		<AnimatePresence>
			{ctx.isOpen && (
				<motion.div
					className="modal modal-open fixed inset-0 flex items-center justify-center bg-black/50 z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={` modal-box rounded-lg shadow-lg w-full ${sizeClasses[size]} p-6`}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div className="absolute top-4 right-4">
							<Button variant="ghost" onClick={ctx.closeModal}>
								<XIcon />
							</Button>
						</div>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
