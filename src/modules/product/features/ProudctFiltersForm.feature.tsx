// import type { BrandModel } from "@modules/brand";
// import type { CategoryModel } from "@modules/category";
// import { Button } from "@shared/ui/Button.ui";
// import { Checkbox, Input } from "@shared/ui/fields";
// import { Select, SelectItem } from "@shared/ui/Select.ui";
// import { Label } from "@shared/ui/text";
// import { SlidersHorizontalIcon } from "lucide-react";
// import type { ProductFiltersState } from "../widgets/ProductFilters.widget";
// import { useForm } from "react-hook-form";
// import { Form } from "@shared/ui/Form.ui";
// import type { FormRules } from "@shared/types";
// import type { ProductFiltersDto } from "../product.dto";

// interface IProductFiltersFormProps {
//   activeFilterCount: number;
//   resetFilters: () => void;
//   categories: CategoryModel[];
//   brands: BrandModel[];
//   filters: ProductFiltersState;
// }

// const FiltersFormRules: FormRules<ProductFiltersDto> = {
//   maxPrice: {
//     min: { message: "Минимальная цена должна быть больше 0", value: 0 },
//     max: {
//       message: "Максимальная цена должна быть больше минимальной",
//       value: 30000,
//     },
//   },
//   minPrice: {
//     min: { message: "Минимальная цена должна быть больше 0", value: 0 },
//     max: {
//       message: "Максимальная цена должна быть больше минимальной",
//       value: 0,
//     },
//   },
//   category: { required: "Выберите категорию" },
//   brand: { required: "Выберите бренд" },
// };

// export const ProductFiltersForm: React.FC<IProductFiltersFormProps> = ({
//   activeFilterCount,
//   resetFilters,
//   categories,
//   brands,
//   filters,
// }) => {
//   const { register, handleSubmit } = useForm<ProductFiltersDto>({
//     mode: "onChange",
//   });

//   const onSubmit = handleSubmit((data) => {
//     console.log(data);
//   });

//   return (
//     <form onSubmit={onSubmit} className="dropdown dropdown-end">
//       <Button tabIndex={0} variant="ghost">
//         <SlidersHorizontalIcon className="h-4 w-4" />
//         Фильтры
//         {activeFilterCount > 0 && (
//           <div className="badge badge-secondary badge-sm absolute -top-1.5 -right-1.5">
//             {activeFilterCount}
//           </div>
//         )}
//       </Button>

//       <div className="dropdown-content z-50 shadow-2xl bg-base-100 rounded-box border border-base-300 w-80 mt-2 overflow-hidden">
//         <div className="flex items-center justify-between px-4 py-3">
//           <h4 className="font-medium text-base">Фильтры</h4>
//           <button
//             type="button"
//             className="btn btn-ghost btn-xs text-xs normal-case"
//             onClick={resetFilters}
//           >
//             Сбросить
//           </button>
//         </div>

//         <div className="divider my-0" />

//         <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
//           {/* Категория */}
//           {categories.length > 0 && (
//             <Select
//               value={filters.category ?? ""}
//               placeholder="Все категории"
//               label="Категория"
//             >
//               <SelectItem value="">Все</SelectItem>
//               {categories.map((cat) => (
//                 <SelectItem key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </SelectItem>
//               ))}
//             </Select>
//           )}

//           {/* Бренд */}
//           {brands.length > 0 && (
//             <Select
//               value={filters.brand ?? ""}
//               placeholder="Все бренды"
//               label="Бренд"
//             >
//               <SelectItem value="">Все</SelectItem>
//               {brands.map((b) => (
//                 <SelectItem key={b._id} value={b._id}>
//                   {b.name}
//                 </SelectItem>
//               ))}
//             </Select>
//           )}

//           {/* Цена */}
//           <div className="space-y-2">
//             <Label className="text-sm font-medium">Цена</Label>
//             <div className="grid grid-cols-2 gap-3">
//               <Input
//                 type="number"
//                 placeholder="От"
//                 value={filters.minPrice}
//                 className="input-bordered"
//               />
//               <Input
//                 type="number"
//                 placeholder="До"
//                 value={filters.maxPrice}
//                 className="input-bordered"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="divider my-0" />

//         <div className="flex justify-end gap-2 px-4 py-3">
//           <Button
//             variant="outline"
//             size="sm"
//             className="normal-case"
//             // onClick={() => setIsFiltersOpen(false)}
//           >
//             Закрыть
//           </Button>
//           <Button
//             size="sm"
//             className="btn-primary normal-case"
//             // onClick={applyFilters}
//           >
//             Применить
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// };

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
import { useProductFiltersStore } from "../store/product-filters.store";

interface IProductFiltersFormProps {
	activeFilterCount: number;
	// resetFilters: () => void;
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
	// resetFilters,
	categories,
	brands,
}) => {
	const { filters, setFilters } = useProductFiltersStore();

	const { control, handleSubmit, reset } = useForm<ProductFiltersDto>({
		mode: "onChange",
		defaultValues: {
			category: categories[0]?._id,
			brand: brands[0]?._id,
			minPrice: filters.minPrice,
			maxPrice: filters.maxPrice,
		},
	});

	const onSubmit: SubmitHandler<ProductFiltersDto> = (data) => {
		setFilters(data);
		noticeToastSvc.success("Фильтры успешно применены");
	};

	const resetFilters = () => {
		setFilters({
			category: "",
			brand: "",
			minPrice: 0,
			maxPrice: 0,
		});
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
