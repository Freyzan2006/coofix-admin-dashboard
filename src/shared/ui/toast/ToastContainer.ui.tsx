import { AnimatePresence } from "motion/react";
import { ToastItem } from "./ToastItem.ui";
import { useToastStore } from "./toast.store";

export function ToastContainer() {
	const toasts = useToastStore((s) => s.toasts);

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
			<AnimatePresence initial={false}>
				{toasts.map((toast) => (
					<ToastItem key={toast.id} toast={toast} />
				))}
			</AnimatePresence>
		</div>
	);
}
