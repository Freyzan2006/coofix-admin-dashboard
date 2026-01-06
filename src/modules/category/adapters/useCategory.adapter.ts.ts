import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../category.factory";

export function useCategoryAdapter(slug: string) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["category", slug],
		queryFn: async () => await categoryService.getCategoryBySlug(slug),
	});

	return {
		category: data,
		categoryIsLoading: isLoading,
		categoryIsError: isError,
		categoryError: error,
	};
}
