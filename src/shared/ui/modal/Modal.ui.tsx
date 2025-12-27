import type React from "react";
import { useCallback, useEffect, useState } from "react";

import { ModalContext } from "./modal.context";

interface ModalProps {
	children: React.ReactNode;
	defaultOpen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
	children,
	defaultOpen = false,
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);
	const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

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
