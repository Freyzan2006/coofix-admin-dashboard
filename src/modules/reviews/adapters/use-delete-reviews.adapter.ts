import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import { reviewsApi } from "../reviews.factory";

export function useDeleteReviewsAdapter() {
	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (reviewId: string) =>
			await reviewsApi.deleteReview(reviewId),
		onSuccess: () => {
			noticeToastSvc.success("Отзыв успешно удален");
		},
		onError: () => {
			noticeToastSvc.error("Ошибка при удалении отзыва");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
	});

	return {
		deleteReview: mutate,
		deleteReviewAsync: mutateAsync,
		isPending,
		isError,
		isSuccess,
	};
}
