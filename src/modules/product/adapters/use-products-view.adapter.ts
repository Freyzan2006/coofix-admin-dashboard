import { useQuery } from "@tanstack/react-query";
import { productService } from "../product.di";
import { useProductStore } from "../store/product.store";
import {
	cleanFilters,
	useProductFiltersStore,
} from "../store/product-filters.store";

export const useProductsViewAdapter = () => {
	const { page, limit, setPage } = useProductStore();

	const rawFilters = useProductFiltersStore((s) => s.filters);
	const filters = cleanFilters({
		category: rawFilters.category,
		brand: rawFilters.brand,
		minPrice: rawFilters.minPrice,
		maxPrice: rawFilters.maxPrice,
	});

	const hasFilters = Object.keys(filters).length > 0;

	const allQuery = useQuery({
		queryKey: ["products", "all", page, limit],
		queryFn: async () => await productService.allProducts(page, limit),
		enabled: !hasFilters,
		refetchOnMount: true,
	});

	const filteredQuery = useQuery({
		queryKey: [
			"products",
			"filtered",
			filters.category,
			filters.brand,
			filters.minPrice,
			filters.maxPrice,
		],
		queryFn: async () => await productService.filterProduct(filters),
		enabled: hasFilters,
	});

	const query = hasFilters ? filteredQuery : allQuery;

	const handlerPageChange = (newPage: number) => setPage(newPage);

	console.log(hasFilters);
	console.log(filters);
	console.log(query.data?.products);

	return {
		products: query.data?.products ?? [],
		total: query.data?.total ?? 0,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,

		handlerPageChange,

		currentPage: page,
		setPage,
		limit,
	};
};
