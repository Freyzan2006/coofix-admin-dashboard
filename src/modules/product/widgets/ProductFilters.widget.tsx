"use client";

import type { BrandModel } from "@modules/brand";
import type { CategoryModel } from "@modules/category";
import { cn } from "@shared/lib/utils";

import { useEffect } from "react";
import { ProductFiltersForm } from "../features/ProudctFiltersForm.feature";
import { SearchProduct } from "../features/SearchProduct.feature";
import type { ProductFiltersDto } from "../product.dto";
import { useProductFiltersStore } from "../store/product-filters.store";
import { ProductFiltersBadge } from "../ui/ProductFiltersBadge.ui";

interface ProductFiltersProps {
	onFilterChange: (filters: ProductFiltersDto) => void;
	categories?: CategoryModel[];
	brands?: BrandModel[];
	className?: string;
}

export function ProductFilters({
	onFilterChange,
	categories = [],
	brands = [],
	className,
}: ProductFiltersProps) {
	const { filters } = useProductFiltersStore();

	useEffect(() => {
		const timer = setTimeout(() => {
			onFilterChange(filters);
		}, 300);
		return () => clearTimeout(timer);
	}, [filters, onFilterChange]);

	const activeFilterCount =
		(filters.category ? 1 : 0) +
		(filters.brand ? 1 : 0) +
		(filters.minPrice || filters.maxPrice ? 1 : 0);

	return (
		<div className={cn("flex flex-col gap-4 ", className)}>
			<div className="flex flex-col items-center sm:flex-row gap-3">
				<SearchProduct />
				<ProductFiltersForm
					activeFilterCount={activeFilterCount}
					categories={categories}
					brands={brands}
				/>
			</div>

			<ProductFiltersBadge
				activeFilterCount={activeFilterCount}
				categories={categories}
				brands={brands}
			/>
		</div>
	);
}
