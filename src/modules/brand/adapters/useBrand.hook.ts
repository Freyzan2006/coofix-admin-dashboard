import { useQuery } from "@tanstack/react-query";
import { brandService } from "../di/brand.di";

export function useBrand(slug: string) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["brand"],
		queryFn: async () => await brandService.getBrandBySlug(slug),
	});

	return {
		brand: data || {},
		isLoadingBrand: isLoading,
		isErrorBrand: isError,
	};
}
