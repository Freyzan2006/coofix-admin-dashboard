import type { PropsWithChildren } from "react";
import { motion } from "motion/react";

export const PopUpAppearance: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			animate={{ x: 0, y: 0 }}
			initial={{ x: 0, y: 100 }}
			transition={{ type: "spring" }}
		>
			{children}
		</motion.div>
	);
};
