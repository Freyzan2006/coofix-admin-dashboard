import { useQuery } from "@tanstack/react-query";
import { brandService } from "../di/brand.di";

export function useBrands() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["brands"],
		queryFn: async () => await brandService.getAllBrands(),
	});

	return {
		brands: data || [],
		brandsIsError: isError,
		brandsIsLoading: isLoading,
	};
}
