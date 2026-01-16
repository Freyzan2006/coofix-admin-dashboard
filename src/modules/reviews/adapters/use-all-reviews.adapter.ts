import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "../reviews.factory";

export function useAllReviewsAdapter(productId: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["reviews"],
		queryFn: async () => await reviewsApi.getReviews(productId),
	});

	return {
		reviews: data || [],
		isLoadingReviews: isLoading,
		errorReviews: error,
	};
}
