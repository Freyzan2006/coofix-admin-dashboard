import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";

import { categoryService } from "../category.factory";
import type { CategoryModel, MutationCategoryModel } from "../category.model";

export function useUpdateCategoryAdapter(categoryId: string) {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (data: MutationCategoryModel) => {
			await categoryService.updateCategory(categoryId, data);
		},
		onSuccess: () => {
			toast.success("Категория успешно обновлена");
			queryClient.setQueryData(
				["category", categoryId],
				(data: CategoryModel) => data,
			);
		},
		onError: () => {
			toast.error("Произошла ошибка при обновлении категории");
		},
	});

	return {
		updateCategory: mutate,
		updateCategoryAsync: mutateAsync,
		isErrorUpdateCategory: isError,
		isPendingCategory: isPending,
		isSuccessCategory: isSuccess,
	};
}
