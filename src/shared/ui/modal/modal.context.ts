import React from "react";

interface ModalContextType {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
}

export const ModalContext = React.createContext<ModalContextType | null>(null);
