import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import type { MutationReviewsDto } from "../reviews.dto";
import { reviewsApi } from "../reviews.factory";

export function useMutationReviewsAdapter() {
	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async (data: MutationReviewsDto) =>
			await reviewsApi.mutateReview(data),
		onSuccess: () => {
			noticeToastSvc.success("Отзов успешно оставилн");
		},
		onError: () => {
			noticeToastSvc.error("Ошибка при создании отзыва. Попробуйте позже");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
	});

	return {
		createReview: mutate,
		createReviewAsync: mutateAsync,
		isPending,
		isSuccess,
		isError,
	};
}
