import type { PropsWithChildren } from "react";

import { motion } from "motion/react";

export const SmoothAppearance: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
			initial={{ opacity: 0, transition: { duration: 0.5 } }}
			exit={{ opacity: 0, transition: { duration: 0.5 } }}
		>
			{children}
		</motion.div>
	);
};
