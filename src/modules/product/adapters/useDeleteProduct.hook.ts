import { queryClient } from "@app/providers/TanStackProvider";
import { useMutation } from "@tanstack/react-query";
import { productService } from "../di/product.di";

export function useDeleteProduct(id: string) {
	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async () => {
			await productService.deleteProductById(id);
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onSuccess: () => {},
	});

	return {
		doDelete: mutate,
		doDeleteAsync: mutateAsync,
		isPending,
		isSuccess,
		isError,
	};
}
