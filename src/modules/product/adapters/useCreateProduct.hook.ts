import { queryClient } from "@app/providers/TanStackProvider";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { productService } from "../di/product.di";
import type { CreateProductDto } from "../model/create-product.model";

export function useCreateProduct() {
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

	return {
		doCreate: mutate,
		doCreateAsync: mutateAsync,
		isError,
		isPending,
		isSuccess,
	};
}
