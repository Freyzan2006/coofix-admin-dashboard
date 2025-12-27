import { cn } from "@shared/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Kbd } from "../keyboards";
import { ModalContext } from "./modal.context";

interface ModalContentProps {
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
	children,
	size = "md",
	className,
}) => {
	const ctx = React.useContext(ModalContext);
	if (!ctx) throw new Error("ModalContent must be used inside Modal");

	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md p-6",
		lg: "max-w-lg",
	};

	return (
		<AnimatePresence>
			{ctx.isOpen && (
				<motion.div
					className={cn("modal modal-open")}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className={cn(
							`modal-box overflow-x-hidden min-h-[500px] ${sizeClasses[size]} max-h-[80vh]`,
							className,
						)}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div className="absolute top-1 right-1">
							<button type="button" onClick={ctx.closeModal}>
								<Kbd value="X(Esc)" />
							</button>
						</div>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
