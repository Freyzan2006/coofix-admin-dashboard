import { queryClient, type UpdateData } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import type { UpdateCategoryDto } from "../api/category.dto";
import { categoryService } from "../di/category.di";

export function useUpdateCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (data: UpdateData<UpdateCategoryDto>) => {
			await categoryService.updateCategory(data.id, data.dto);
		},
		onSuccess: () => {
			toast.success("Категория успешно обновлена");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
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
