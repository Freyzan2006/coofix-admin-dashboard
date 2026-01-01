import { queryClient } from "@app/providers/TanStackProvider";
import { type BrandModel, useBrands } from "@modules/brand";
import { type CategoryModel, useCategories } from "@modules/category";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { productService } from "../di/product.di";
import type { CreateProductDto } from "../model/create-product.model";

export function useCreateProduct() {
	const { brands, brandsIsError, brandsIsLoading } = useBrands();
	const { categories, categoriesIsError, categoriesIsLoading } =
		useCategories();

	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (data: CreateProductDto) => {
			await productService.createProduct(data);
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onSuccess: () => {
			toast.success("Продукт успешно создан");
		},
		onError: () => {
			toast.error("Произошла ошибка при создании продукта");
		},
	});

	const categoriesForForm = categories.map((category: CategoryModel) => {
		return {
			label: category.name,
			value: category._id,
		};
	});

	const brandsForForm = brands.map((brand: BrandModel) => {
		return {
			label: brand.name,
			value: brand._id,
		};
	});

	return {
		doCreate: mutate,
		doCreateAsync: mutateAsync,
		isError,
		isPending,
		isSuccess,

		brands: brandsForForm,
		brandsIsError,
		brandsIsLoading,

		categories: categoriesForForm,
		categoriesIsLoading,
		categoriesIsError,
	};
}
