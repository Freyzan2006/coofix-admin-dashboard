import { useQuery } from "@tanstack/react-query";
import { productService } from "../product.di";
import { useProductStore } from "../store/product.store";
import { useProductFiltersStore } from "../store/product-filters.store";

const DEFAULT_FILTERS = {
	category: "",
	brand: "",
	minPrice: 0,
	maxPrice: 0,
};

export const useProductsViewAdapter = () => {
	const { filters } = useProductFiltersStore();
	const { page, limit, setPage } = useProductStore();

	const hasFilters =
		filters.category !== DEFAULT_FILTERS.category ||
		filters.brand !== DEFAULT_FILTERS.brand ||
		filters.minPrice !== DEFAULT_FILTERS.minPrice ||
		filters.maxPrice !== DEFAULT_FILTERS.maxPrice;

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
