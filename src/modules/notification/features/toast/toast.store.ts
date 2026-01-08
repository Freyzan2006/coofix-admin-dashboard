import { create } from "zustand";

export type ToastType = "info" | "success" | "error";

export interface IToastState {
	id: string;
	type: ToastType;
	message: string;
}

interface ToastStore {
	toasts: IToastState[];
	push: (toast: Omit<IToastState, "id">) => void;
	remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
	toasts: [],
	push: (toast) =>
		set((state) => ({
			toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
		})),
	remove: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((t) => t.id !== id),
		})),
}));
