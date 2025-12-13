import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ModalContext, type ModalContextType } from "./modal.context";

interface ModalProps {
	children: React.ReactNode;
	defaultOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	defaultOpen = false,
	onOpenChange,
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const openModal = useCallback(() => {
		setIsOpen(true);
		onOpenChange?.(true);
	}, [onOpenChange]);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		onOpenChange?.(false);
	}, [onOpenChange]);

	const toggleModal = useCallback(() => {
		setIsOpen((prev) => {
			const newState = !prev;
			onOpenChange?.(newState);
			return newState;
		});
	}, [onOpenChange]);

	// Управление native dialog API
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}

		return () => {
			dialog.removeEventListener("close", () => {
				setIsOpen(false);
				onOpenChange?.(false);
			});
		};
	}, [isOpen, onOpenChange]);

	// Закрытие по ESC
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [closeModal]);

	const contextValue: ModalContextType = {
		isOpen,
		openModal,
		closeModal,
		toggleModal,
	};

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	);
};
