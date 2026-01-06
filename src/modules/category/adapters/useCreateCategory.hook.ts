import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";

import { categoryService } from "../category.factory";
import type { CreateCategoryModel } from "../category.model";

export function useCreateCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (dto: CreateCategoryModel) => {
			await categoryService.createCategory(dto);
		},
		onSuccess: () => {
			toast.success("Новая категория создана");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: () => {
			toast.error("Произошла ошибка при создании категории");
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
