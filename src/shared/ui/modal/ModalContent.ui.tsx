import type React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@shared/lib/utils";
import { useModal } from "./useModal.hook";

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
	showCloseButton?: boolean;
	disableOutsideClick?: boolean;
	size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const ModalContent: React.FC<ModalContentProps> = ({
	children,
	className,
	showCloseButton = true,
	disableOutsideClick = false,
	size = "md",
	...props
}) => {
	const { isOpen, closeModal } = useModal();
	const contentRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const sizeClasses = {
		sm: "max-w-xs",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-3xl",
		full: "max-w-7xl",
	};

	// Focus trap для accessibility
	useEffect(() => {
		if (!isOpen) return;

		const focusableElements = contentRef.current?.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);

		if (focusableElements && focusableElements.length > 0) {
			(focusableElements[0] as HTMLElement).focus();
		}

		// Управляем нативным dialog
		const dialog = dialogRef.current;
		if (dialog) {
			dialog.showModal();
		}

		return () => {
			if (dialog) {
				dialog.close();
			}
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<dialog ref={dialogRef} className="modal modal-open">
			<div
				ref={contentRef}
				className={cn("modal-box", sizeClasses[size], className)}
				{...props}
			>
				{showCloseButton && (
					<button
						type="button"
						onClick={closeModal}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
						aria-label="Закрыть"
					>
						✕
					</button>
				)}
				<div className="relative">{children}</div>
			</div>

			{/* Затемнение фона - НЕ кликабельное если disableOutsideClick = true */}
			<form method="dialog" className="modal-backdrop">
				<button
					type="button"
					onClick={disableOutsideClick ? undefined : closeModal}
				>
					close
				</button>
			</form>
		</dialog>,
		document.body,
	);
};
