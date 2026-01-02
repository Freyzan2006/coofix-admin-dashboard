import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

export const EnterAnimation: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};
