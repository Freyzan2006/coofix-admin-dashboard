"use client";

import type { BrandModel } from "@modules/brand";
import type { CategoryModel } from "@modules/category";
import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/Badge.ui";
import { Button } from "@shared/ui/Button.ui";
import { Checkbox, Input } from "@shared/ui/fields";
import { Select, SelectItem } from "@shared/ui/Select.ui";

import { Label } from "@shared/ui/text";
import { SlidersHorizontal, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchProduct } from "../features/SearchProduct.feature";

interface ProductFiltersProps {
	onFilterChange: (filters: ProductFiltersState) => void;
	initialFilters?: Partial<ProductFiltersState>;
	categories?: CategoryModel[];
	brands?: BrandModel[];
	className?: string;
}

export interface ProductFiltersState {
	search: string;
	category: string | null;
	brand: string | null;
	inStock: boolean | null;
	isNew: boolean | null;
	isSale: boolean | null;
	minPrice: string;
	maxPrice: string;
	sortBy: "newest" | "price-asc" | "price-desc" | "rating" | null;
}

const defaultFilters: ProductFiltersState = {
	search: "",
	category: null,
	brand: null,
	inStock: null,
	isNew: null,
	isSale: null,
	minPrice: "",
	maxPrice: "",
	sortBy: null,
};

export function ProductFilters({
	onFilterChange,
	initialFilters = {},
	categories = [],
	brands = [],
	className,
}: ProductFiltersProps) {
	const [filters, setFilters] = useState<ProductFiltersState>({
		...defaultFilters,
		...initialFilters,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			onFilterChange(filters);
		}, 300);
		return () => clearTimeout(timer);
	}, [filters, onFilterChange]);

	const resetFilters = () => {
		setFilters(defaultFilters);
		// setIsFiltersOpen(false);
	};

	const applyFilters = () => {
		// setIsFiltersOpen(false);
	};

	const activeFilterCount =
		(filters.search ? 1 : 0) +
		(filters.category ? 1 : 0) +
		(filters.brand ? 1 : 0) +
		(filters.inStock !== null ? 1 : 0) +
		(filters.isNew !== null ? 1 : 0) +
		(filters.isSale !== null ? 1 : 0) +
		(filters.minPrice || filters.maxPrice ? 1 : 0) +
		(filters.sortBy ? 1 : 0);

	return (
		<div className={cn("flex flex-col gap-4 ", className)}>
			<div className="flex flex-col items-center sm:flex-row gap-3">
				<SearchProduct filters={filters} setFilters={setFilters} />
				{/*<div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 z-1 -translate-y-1/2 h-4 w-4 text-base-content/60" />
          <Input
						placeholder="Поиск по названию"
						value={filters.search}
						onChange={(e) =>
							setFilters((prev) => ({ ...prev, search: e.target.value }))
						}
						className="pl-10 input-bordered"
          />

        </div>*/}

				<div className="dropdown dropdown-end">
					<Button tabIndex={0} variant="ghost">
						<SlidersHorizontal className="h-4 w-4" />
						Фильтры
						{activeFilterCount > 0 && (
							<div className="badge badge-secondary badge-sm absolute -top-1.5 -right-1.5">
								{activeFilterCount}
							</div>
						)}
					</Button>

					<div
						// tabIndex={0}
						className="dropdown-content z-50 shadow-2xl bg-base-100 rounded-box border border-base-300 w-80 mt-2 overflow-hidden"
					>
						<div className="flex items-center justify-between px-4 py-3">
							<h4 className="font-medium text-base">Фильтры</h4>
							<button
								type="button"
								className="btn btn-ghost btn-xs text-xs normal-case"
								onClick={resetFilters}
							>
								Сбросить
							</button>
						</div>

						<div className="divider my-0" />

						<div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
							{/* Сортировка */}
							<Select
								value={filters.sortBy ?? ""}
								onChange={(e) =>
									setFilters((prev) => ({
										...prev,
										sortBy:
											e.target.value === ""
												? null
												: (e.target.value as ProductFiltersState["sortBy"]),
									}))
								}
								placeholder="По умолчанию"
								label="Сортировать по"
							>
								<SelectItem value="newest">Новые сначала</SelectItem>
								<SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
								<SelectItem value="price-desc">Цена: по убыванию</SelectItem>
								<SelectItem value="rating">Рейтинг</SelectItem>
							</Select>

							{/* Категория */}
							{categories.length > 0 && (
								<Select
									value={filters.category ?? ""}
									placeholder="Все категории"
									label="Категория"
								>
									<SelectItem value="">Все</SelectItem>
									{categories.map((cat) => (
										<SelectItem key={cat._id} value={cat._id}>
											{cat.name}
										</SelectItem>
									))}
								</Select>
							)}

							{/* Бренд */}
							{brands.length > 0 && (
								<Select
									value={filters.brand ?? ""}
									placeholder="Все бренды"
									label="Бренд"
								>
									<SelectItem value="">Все</SelectItem>
									{brands.map((b) => (
										<SelectItem key={b._id} value={b._id}>
											{b.name}
										</SelectItem>
									))}
								</Select>
							)}

							{/* Цена */}
							<div className="space-y-2">
								<Label className="text-sm font-medium">Цена</Label>
								<div className="grid grid-cols-2 gap-3">
									<Input
										type="number"
										placeholder="От"
										value={filters.minPrice}
										className="input-bordered"
									/>
									<Input
										type="number"
										placeholder="До"
										value={filters.maxPrice}
										className="input-bordered"
									/>
								</div>
							</div>

							{/* Чекбоксы */}
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<Checkbox
										title="В наличии"
										id="inStock"
										checked={filters.inStock === true}
									/>
									<Label htmlFor="inStock" className="text-sm cursor-pointer">
										Только в наличии
									</Label>
								</div>

								<div className="flex items-center gap-2">
									<Checkbox
										id="isNew"
										title="Новинки"
										checked={filters.isNew === true}
									/>
									<Label htmlFor="isNew" className="text-sm cursor-pointer">
										Новинки
									</Label>
								</div>

								<div className="flex items-center gap-2">
									<Checkbox
										id="isSale"
										title="Акция"
										checked={filters.isSale === true}
									/>
									<Label htmlFor="isSale" className="text-sm cursor-pointer">
										По акции
									</Label>
								</div>
							</div>
						</div>

						<div className="divider my-0" />

						<div className="flex justify-end gap-2 px-4 py-3">
							<Button
								variant="outline"
								size="sm"
								className="normal-case"
								// onClick={() => setIsFiltersOpen(false)}
							>
								Закрыть
							</Button>
							<Button
								size="sm"
								className="btn-primary normal-case"
								onClick={applyFilters}
							>
								Применить
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="relative">
				{activeFilterCount > 0 && (
					<div className="flex flex-wrap gap-2 absolute">
						{filters.search && (
							<Badge variant="secondary" className="gap-1 pl-2 pr-1">
								Поиск: {filters.search}
								<button
									type="button"
									className="btn btn-ghost btn-xs h-5 w-5 p-0"
									onClick={() => setFilters((p) => ({ ...p, search: "" }))}
								>
									<XIcon className="h-3 w-3" />
								</button>
							</Badge>
						)}

						{filters.category && (
							<Badge variant="secondary" className="gap-1 px-2">
								Категория:{" "}
								{categories.find((c) => c._id === filters.category)?.name ||
									filters.category}
								<XIcon
									className="h-3 w-3 cursor-pointer"
									onClick={() => setFilters((p) => ({ ...p, category: null }))}
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
		</div>
	);
}
