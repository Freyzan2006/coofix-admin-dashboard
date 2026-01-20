import { useDebounce } from "@shared/hooks/use-debounce.hook";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../product.di";
import { useProductSearchStore } from "../store/product-search.store";

export function useSearchProductAdapter() {
	const { searchQuery } = useProductSearchStore();

	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const { data, isError, isLoading, error } = useQuery({
		enabled: debouncedSearchQuery.length >= 2,
		queryKey: ["products", debouncedSearchQuery],
		queryFn: () => productService.searchProducts(debouncedSearchQuery),
	});

	return {
		searchProducts: data || [],
		isErrorSearchProducts: isError,
		isLoadingSearchProducts: isLoading,
		errorSearchProducts: error,
	};
}
