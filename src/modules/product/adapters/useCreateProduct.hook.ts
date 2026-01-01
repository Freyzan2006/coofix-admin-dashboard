import { queryClient } from "@app/providers/TanStackProvider";
import { type BrandModel, useBrands } from "@modules/brand";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { productService } from "../di/product.di";
import type { CreateProductDto } from "../model/create-product.model";

export function useCreateProduct() {
	const { brands, BrandsIsError, BrandsIsLoading } = useBrands();

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

	const brandsForForm = brands.map((brand: BrandModel) => {
		return {
			label: brand.name,
			value: brand.slug,
		};
	});

	return {
		doCreate: mutate,
		doCreateAsync: mutateAsync,
		isError,
		isPending,
		isSuccess,

		brands: brandsForForm,
		BrandsIsError,
		BrandsIsLoading,
	};
}
