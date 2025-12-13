import { useQuery } from "@tanstack/react-query";
import { productService } from "../di/product.di";
import { ProductStore } from "../store/product.store";

import { useAtom } from "@reatom/npm-react";

export const useProducts = () => {
	const [page, setPage] = useAtom(ProductStore.pageAtom);
	const [limit] = useAtom(ProductStore.limitAtom);

	const { data, isError, isLoading, error, isPending } = useQuery({
		queryKey: ["products", page, limit],
		queryFn: () => productService.allProducts(page, limit),
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
