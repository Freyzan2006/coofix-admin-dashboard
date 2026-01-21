import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import { productService } from "../product.di";
import type { StockUpdateProductDto } from "../product.dto";

export function useStockUpdateProduct(productId: string) {
	const { mutateAsync, isPending, isError, error } = useMutation({
		mutationFn: async (dto: StockUpdateProductDto) =>
			await productService.updateQuantityProductById(productId, dto.stock),
		onSuccess: () => {
			noticeToastSvc.success("Количество товара успешно обновлено");
		},
		onError: () => {
			noticeToastSvc.error("Ошибка при обновлении количества товара");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["products", productId] });
		},
	});

	return {
		updateStockAsync: mutateAsync,
		isPending,
		isError,
		error,
	};
}
