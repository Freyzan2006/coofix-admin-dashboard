// import type React from "react";
// import { useCallback, useEffect, useState } from "react";

import { useCallback, useEffect, useState } from "react";
import { ModalContext } from "./modal.context";

// import { ModalContext } from "./modal.context";

// interface ModalProps {
// 	children: React.ReactNode;
// 	defaultOpen?: boolean;
// }

// export const Modal: React.FC<ModalProps> = ({
// 	children,
// 	defaultOpen = false,
// }) => {
// 	const [isOpen, setIsOpen] = useState(defaultOpen);

// 	const openModal = useCallback(() => setIsOpen(true), []);
// 	const closeModal = useCallback(() => setIsOpen(false), []);
// 	const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

// 	// Закрытие по ESC
// 	useEffect(() => {
// 		const handleEscape = (e: KeyboardEvent) => {
// 			if (e.key === "Escape") closeModal();
// 		};
// 		document.addEventListener("keydown", handleEscape);
// 		return () => document.removeEventListener("keydown", handleEscape);
// 	}, [closeModal]);

// 	return (
// 		<ModalContext.Provider
// 			value={{ isOpen, openModal, closeModal, toggleModal }}
// 		>
// 			{children}
// 		</ModalContext.Provider>
// 	);
// };

interface ModalProps {
	children: React.ReactNode;
	defaultOpen?: boolean;
	controlledOpen?: boolean; // если передан, используется внешний стейт
	onOpenChange?: (isOpen: boolean) => void; // callback для внешнего управления
}

export const Modal: React.FC<ModalProps> = ({
	children,
	defaultOpen = false,
	controlledOpen,
	onOpenChange,
}) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);

	const isOpen = controlledOpen ?? internalOpen;

	const openModal = useCallback(() => {
		if (controlledOpen === undefined) setInternalOpen(true);
		onOpenChange?.(true);
	}, [controlledOpen, onOpenChange]);

	const closeModal = useCallback(() => {
		if (controlledOpen === undefined) setInternalOpen(false);
		onOpenChange?.(false);
	}, [controlledOpen, onOpenChange]);

	const toggleModal = useCallback(() => {
		if (controlledOpen === undefined) setInternalOpen((prev) => !prev);
		onOpenChange?.(!isOpen);
	}, [controlledOpen, isOpen, onOpenChange]);

	// Закрытие по ESC
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [closeModal]);

	return (
		<ModalContext.Provider
			value={{ isOpen, openModal, closeModal, toggleModal }}
		>
			{children}
		</ModalContext.Provider>
	);
};
