import { useQuery } from "@tanstack/react-query";
import { productService } from "../di/product.di";

export function useProductAdapter(slug: string) {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => await productService.findProductBySlug(slug),
	});

	return {
		product: data,
		productIsError: isError,
		productIsLoading: isLoading,
	};
}
