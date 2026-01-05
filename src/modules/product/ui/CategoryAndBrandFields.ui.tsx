import { useCreateProductAdapter } from "@modules/product/adapters/useCreateProduct.adapter";
import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { Alert } from "@shared/ui/Alert.ui";
import { Select } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { Spinner } from "@shared/ui/Spinner.ui";
import { Label } from "@shared/ui/text";
import { Controller, useFormContext } from "react-hook-form";
import type { UpdateProductModel } from "../api/product.dto";
import { fieldsProductRules } from "../config";

export const CategoryAndBrandFields: React.FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<CreateProductModel | UpdateProductModel>();

	const {
		brands,
		brandsIsError,
		brandsIsLoading,
		categories,
		categoriesIsError,
		categoriesIsLoading,
	} = useCreateProductAdapter();

	const defaultCategory = categories.length > 0 ? categories[0].value : "";
	const defaultBrand = brands.length > 0 ? brands[0].value : "";

	return (
		<Space align="center" axis="horizontal" fullWidth>
			<Space gap={3} axis="vertical" fullWidth>
				<Label htmlFor="category">Категория</Label>

				{categoriesIsLoading ? (
					<Spinner />
				) : (
					<Controller
						name="category"
						control={control}
						defaultValue={defaultCategory}
						rules={fieldsProductRules.category}
						render={({ field }) => (
							<Select
								id="category"
								items={categories}
								value={field.value || defaultCategory}
								onChange={field.onChange}
								onBlur={field.onBlur}
								error={errors.category?.message}
							/>
						)}
					/>
				)}

				{categoriesIsError && (
					<Alert variant="danger">
						Произошла ошибка при загрузке категорий
					</Alert>
				)}
			</Space>

			<Space gap={3} axis="vertical" fullWidth>
				<Label htmlFor="brand">Бренд</Label>
				{brandsIsLoading ? (
					<Spinner />
				) : (
					<Controller
						name="brand"
						control={control}
						defaultValue={defaultBrand}
						rules={fieldsProductRules.brand}
						render={({ field }) => (
							<Select
								id="brand"
								items={brands}
								value={field.value || defaultBrand}
								onChange={field.onChange}
								onBlur={field.onBlur}
								error={errors.brand?.message}
							/>
						)}
					/>
				)}
				{brandsIsError && (
					<Alert variant="danger">Произошла ошибка при загрузке брендов</Alert>
				)}
			</Space>
		</Space>
	);
};
