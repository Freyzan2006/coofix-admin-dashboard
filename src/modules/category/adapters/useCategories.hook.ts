import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../category.factory";

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
