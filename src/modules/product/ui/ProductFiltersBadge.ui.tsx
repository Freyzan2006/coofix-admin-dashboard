import type { BrandModel } from "@modules/brand";
import type { CategoryModel } from "@modules/category";
import { noticeToastSvc } from "@modules/notification";
import { Badge } from "@shared/ui/Badge.ui";
import { Button } from "@shared/ui/Button.ui";
import { XIcon } from "lucide-react";
import { isPositiveNumber } from "../product.util";
import { useProductFiltersStore } from "../store/product-filters.store";

interface IProductFiltersBadgeProps {
	activeFilterCount: number;
	categories: CategoryModel[];
	brands: BrandModel[];
}

export const ProductFiltersBadge: React.FC<IProductFiltersBadgeProps> = ({
	activeFilterCount,
	categories,
	brands,
}) => {
	const {
		filters,
		clearCategory,
		clearBrand,
		clearMaxPrice,
		clearMinPrice,
		setFilters,
	} = useProductFiltersStore();

	const resetFilters = () => {
		setFilters({
			category: "",
			brand: "",
			minPrice: 0,
			maxPrice: 0,
		});
		noticeToastSvc.success("Фильтры успешно сброшены");
	};

	return (
		<div className="relative">
			{activeFilterCount > 0 && (
				<div className="flex flex-wrap gap-2 absolute">
					{filters.category && (
						<Badge variant="secondary" className="gap-1 px-2">
							Категория:{" "}
							{categories.find((c) => c._id === filters.category)?.name ||
								filters.category}
							<XIcon
								className="h-3 w-3 cursor-pointer"
								onClick={clearCategory}
							/>
						</Badge>
					)}

					{filters.brand && (
						<Badge variant="secondary" className="gap-1 px-2">
							Бренд:{" "}
							{brands.find((c) => c._id === filters.brand)?.name ||
								filters.brand}
							<XIcon className="h-3 w-3 cursor-pointer" onClick={clearBrand} />
						</Badge>
					)}

					{isPositiveNumber(filters.maxPrice) && (
						<Badge variant="secondary" className="gap-1 px-2">
							Макс. сумма: {filters.maxPrice}
							<XIcon
								className="h-3 w-3 cursor-pointer"
								onClick={clearMaxPrice}
							/>
						</Badge>
					)}

					{isPositiveNumber(filters.maxPrice) && (
						<Badge variant="secondary" className="gap-1 px-2">
							Мин. сумма: {filters.minPrice}
							<XIcon
								className="h-3 w-3 cursor-pointer"
								onClick={clearMinPrice}
							/>
						</Badge>
					)}

					<Button
						variant="ghost"
						size="sm"
						className="text-xs text-base-content/70 hover:text-base-content normal-case"
						onClick={resetFilters}
					>
						Очистить все
					</Button>
				</div>
			)}
		</div>
	);
};
