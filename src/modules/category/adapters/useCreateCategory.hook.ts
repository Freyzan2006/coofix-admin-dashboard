import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import { categoryService } from "../category.factory";
import type { MutationCategoryModel } from "../category.model";

export function useCreateCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (dto: MutationCategoryModel) => {
			await categoryService.createCategory(dto);
		},
		onSuccess: () => {
			noticeToastSvc.success("Новая категория создана");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: () => {
			noticeToastSvc.error("Произошла ошибка при создании категории");
		},
	});

	return {
		createCategory: mutate,
		createCategoryAsync: mutateAsync,
		isErrorCreateCategory: isError,
		isPendingCategory: isPending,
		isSuccessCategory: isSuccess,
	};
}
