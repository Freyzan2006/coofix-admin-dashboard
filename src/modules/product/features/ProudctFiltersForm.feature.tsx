import type { BrandModel } from "@modules/brand";
import type { CategoryModel } from "@modules/category";
import { noticeToastSvc } from "@modules/notification";
import type { FormRules } from "@shared/types";
import { Button } from "@shared/ui/Button.ui";
import { Input } from "@shared/ui/fields";
import { Select, SelectItem } from "@shared/ui/Select.ui";
import { Label } from "@shared/ui/text";
import { SlidersHorizontalIcon } from "lucide-react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type { ProductFiltersDto } from "../product.dto";
import {
	cleanFilters,
	useProductFiltersStore,
} from "../store/product-filters.store";

interface IProductFiltersFormProps {
	activeFilterCount: number;
	categories: CategoryModel[];
	brands: BrandModel[];
}

const FiltersFormRules: FormRules<ProductFiltersDto> = {
	minPrice: {
		min: { value: 0, message: "Минимальная цена должна быть больше 0" },
	},
	maxPrice: {
		min: { value: 0, message: "Цена должна быть больше 0" },
	},
	category: {},
	brand: {},
};

export const ProductFiltersForm: React.FC<IProductFiltersFormProps> = ({
	activeFilterCount,
	categories,
	brands,
}) => {
	const { filters, setFilters } = useProductFiltersStore();

	const { control, handleSubmit, reset } = useForm<ProductFiltersDto>({
		mode: "onChange",
		defaultValues: filters,
	});

	const onSubmit: SubmitHandler<ProductFiltersDto> = (data) => {
		setFilters(
			cleanFilters({
				minPrice: data.minPrice,
				maxPrice: data.maxPrice,
				category: data.category,
				brand: data.brand,
			}),
		);
		noticeToastSvc.success("Фильтры успешно применены");
	};

	const resetFilters = () => {
		setFilters({});
		reset();
		noticeToastSvc.success("Фильтры успешно сброшены");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="dropdown dropdown-end">
			<Button tabIndex={0} variant="ghost">
				<SlidersHorizontalIcon className="h-4 w-4" />
				Фильтры
				{activeFilterCount > 0 && (
					<div className="badge badge-secondary badge-sm absolute -top-1.5 -right-1.5">
						{activeFilterCount}
					</div>
				)}
			</Button>

			<div className="dropdown-content z-50 shadow-2xl bg-base-100 rounded-box border border-base-300 w-80 mt-2 overflow-hidden">
				<div className="flex items-center justify-between px-4 py-3">
					<h4 className="font-medium text-base">Фильтры</h4>
					<button
						type="button"
						className="btn btn-ghost btn-xs"
						onClick={resetFilters}
					>
						Сбросить
					</button>
				</div>

				<div className="divider my-0" />

				<div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
					{/* Категория */}
					{categories.length > 0 && (
						<Controller
							control={control}
							name="category"
							rules={FiltersFormRules.category}
							render={({ field }) => (
								<Select
									{...field}
									label="Категория"
									placeholder="Все категории"
								>
									<SelectItem value="">Все</SelectItem>
									{categories.map((cat) => (
										<SelectItem key={cat._id} value={cat._id}>
											{cat.name}
										</SelectItem>
									))}
								</Select>
							)}
						/>
					)}

					{/* Бренд */}
					{brands.length > 0 && (
						<Controller
							control={control}
							name="brand"
							rules={FiltersFormRules.brand}
							render={({ field }) => (
								<Select {...field} label="Бренд" placeholder="Все бренды">
									<SelectItem value="">Все</SelectItem>
									{brands.map((b) => (
										<SelectItem key={b._id} value={b._id}>
											{b.name}
										</SelectItem>
									))}
								</Select>
							)}
						/>
					)}

					{/* Цена */}
					<div className="space-y-2">
						<Label className="text-sm font-medium">Цена</Label>

						<div className="grid grid-cols-2 gap-3">
							<Controller
								control={control}
								name="minPrice"
								rules={FiltersFormRules.minPrice}
								render={({ field }) => (
									<Input
										{...field}
										type="number"
										placeholder="От"
										className="input-bordered"
									/>
								)}
							/>

							<Controller
								control={control}
								name="maxPrice"
								rules={FiltersFormRules.maxPrice}
								render={({ field }) => (
									<Input
										{...field}
										type="number"
										placeholder="До"
										className="input-bordered"
									/>
								)}
							/>
						</div>
					</div>
				</div>

				<div className="divider my-0" />

				<div className="flex justify-end gap-2 px-4 py-3">
					<Button type="button" variant="outline" size="sm">
						Закрыть
					</Button>
					<Button type="submit" size="sm" className="btn-primary">
						Применить
					</Button>
				</div>
			</div>
		</form>
	);
};
