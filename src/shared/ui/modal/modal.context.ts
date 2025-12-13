import { createContext } from "react";

export interface ModalContextType {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
	undefined,
);
