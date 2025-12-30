import { useToastStore } from "./toast.store";

export const toast = {
	success: (message: string) =>
		useToastStore.getState().push({ type: "success", message }),

	error: (message: string) =>
		useToastStore.getState().push({ type: "error", message }),

	info: (message: string) =>
		useToastStore.getState().push({ type: "info", message }),
};
