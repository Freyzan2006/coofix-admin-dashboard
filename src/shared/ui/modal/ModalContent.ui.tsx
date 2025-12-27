import { cn } from "@shared/lib/utils";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Button } from "../Button.ui";
import { ModalContext } from "./modal.context";

interface ModalContentProps {
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
}

export const ModalContent: React.FC<ModalContentProps> = ({
	children,
	size = "md",
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
							`modal-box overflow-x-hidden min-h-[500px] ${sizeClasses[size]}`,
						)}
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<div className="absolute top-4 right-4">
							<Button variant="ghost" onClick={ctx.closeModal}>
								<XIcon />
							</Button>
						</div>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
