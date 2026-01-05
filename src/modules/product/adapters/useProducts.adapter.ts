import { useQuery } from "@tanstack/react-query";
import { productService } from "../product.di";
import { useProductStore } from "../store/product.store";

export const useProductsAdapter = () => {
	const { page, setPage, limit } = useProductStore();

	const { data, isError, isLoading, error, isPending } = useQuery({
		queryKey: ["products", page, limit],
		queryFn: async () => await productService.allProducts(page, limit),
	});

	const handlerPageChange = (page: number) => setPage(page);

	return {
		products: data?.products || [],
		total: data?.total || 0,
		isError,
		isLoading,
		error,
		isPending,

		currentPage: page,
		handlerPageChange,
		limit,
	};
};
