import { useQuery } from "@tanstack/react-query";
import { productService } from "../di/product.di";

export const useProducts = () => {
	const { data, isError, isLoading, error, isPending } = useQuery({
		queryKey: ["products"],
		queryFn: () => productService.allProducts(),
	});

	return {
		products: data?.products || [],
		total: data?.total || 0,
		isError,
		isLoading,
		error,
		isPending,
	};
};
