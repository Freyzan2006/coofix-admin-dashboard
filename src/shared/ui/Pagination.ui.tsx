// import { Button } from "./Button.ui";

// interface IPaginationProps {
// 	current: number;
// 	total: number;
// 	onChange: (page: number) => void;
// }

// export const Pagination: React.FC<IPaginationProps> = ({
// 	current,
// 	total,
// 	onChange,
// }) => {
// 	return (
// 		<div className="join">
// 			{Array.from({ length: total }, (_, index) => index + 1).map((page) => (
// 				<Button
// 					onClick={() => onChange(page)}
// 					key={page}
// 					variant={current === page ? "ghost" : "primary"}
// 					className={current === page ? "join-item btn-active" : "join-item"}
// 				>
// 					{page}
// 				</Button>
// 			))}
// 		</div>
// 	);
// };

import { ChevronLeft, ChevronRight } from "lucide-react";
// Pagination.ui.tsx - улучшенная версия
import { Button } from "./Button.ui";

interface IPaginationProps {
	current: number;
	total: number;
	onChange: (page: number) => void;
	maxVisible?: number; // Максимальное количество видимых кнопок
}

export const Pagination: React.FC<IPaginationProps> = ({
	current,
	total,
	onChange,
	maxVisible = 3,
}) => {
	if (total <= 1) return null;

	const getVisiblePages = () => {
		const half = Math.floor(maxVisible / 2);
		let start = Math.max(current - half, 1);
		const end = Math.min(start + maxVisible - 1, total);

		if (end - start + 1 < maxVisible) {
			start = Math.max(end - maxVisible + 1, 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const visiblePages = getVisiblePages();

	return (
		<div className="flex items-center gap-2">
			<Button
				onClick={() => onChange(current - 1)}
				disabled={current === 1}
				variant="outline"
				size="sm"
				className="flex items-center gap-1"
			>
				<ChevronLeft size={16} />
				Назад
			</Button>

			{visiblePages[0] > 1 && (
				<>
					<Button
						onClick={() => onChange(1)}
						variant={current === 1 ? "primary" : "outline"}
						size="sm"
						className="min-w-[40px]"
					>
						1
					</Button>
					{visiblePages[0] > 2 && <span className="px-2">...</span>}
				</>
			)}

			{visiblePages.map((page) => (
				<Button
					key={page}
					onClick={() => onChange(page)}
					variant={current === page ? "primary" : "outline"}
					size="sm"
					className="min-w-[40px]"
				>
					{page}
				</Button>
			))}

			{visiblePages[visiblePages.length - 1] < total && (
				<>
					{visiblePages[visiblePages.length - 1] < total - 1 && (
						<span className="px-2">...</span>
					)}
					<Button
						onClick={() => onChange(total)}
						variant={current === total ? "primary" : "outline"}
						size="sm"
						className="min-w-[40px]"
					>
						{total}
					</Button>
				</>
			)}

			<Button
				onClick={() => onChange(current + 1)}
				disabled={current === total}
				variant="outline"
				size="sm"
				className="flex items-center gap-1"
			>
				Вперед
				<ChevronRight size={16} />
			</Button>

			<span className="text-sm text-gray-500 ml-2">
				{current} из {total}
			</span>
		</div>
	);
};
