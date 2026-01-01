import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../di/category.di";

export function useCategories() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => await categoryService.getAllCategories(),
	});

	return {
		categories: data || [],
		categoriesIsLoading: isLoading,
		categoriesIsError: isError,
		categoriesError: error,
	};
}
