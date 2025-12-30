import { CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import type { IToastState } from "./toast.store";
import { useToastStore } from "./toast.store";

const variants = {
	hidden: {
		opacity: 0,
		x: 80,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
	},
	exit: {
		opacity: 0,
		x: 80,
		scale: 0.95,
	},
};

export function ToastItem({ toast }: { toast: IToastState }) {
	const remove = useToastStore((s) => s.remove);

	useEffect(() => {
		const timer = setTimeout(() => remove(toast.id), 3000);
		return () => clearTimeout(timer);
	}, [toast.id, remove]);

	const variantsIcon = {
		success: <CircleCheckIcon size={20} />,
		error: <CircleXIcon />,
		info: <InfoIcon />,
	} as const;

	return (
		<motion.div
			layout
			variants={variants}
			initial="hidden"
			animate="visible"
			exit="exit"
			transition={{
				duration: 0.25,
				ease: "easeOut",
			}}
			className={`alert alert-${toast.type}`}
			onClick={() => remove(toast.id)}
		>
			<div className="flex p-3">
				<button
					type="button"
					className="absolute top-2 right-2 cursor-pointer"
					onClick={() => remove(toast.id)}
				>
					<XIcon size={20} />
				</button>
				<div className="absolute top-2 left-2">{variantsIcon[toast.type]}</div>
				<span>{toast.message}</span>
			</div>
		</motion.div>
	);
}
