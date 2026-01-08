import { useToastStore } from "./toast.store";

export interface IToastApi {
	success: (message: string) => void;
	error: (message: string) => void;
	info: (message: string) => void;
}

export const toast: IToastApi = {
	success: (message: string) =>
		useToastStore.getState().push({ type: "success", message }),

	error: (message: string) =>
		useToastStore.getState().push({ type: "error", message }),

	info: (message: string) =>
		useToastStore.getState().push({ type: "info", message }),
};
