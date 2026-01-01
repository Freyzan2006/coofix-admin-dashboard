import { queryClient } from "@app/providers/TanStackProvider";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import type { CreateCategoryDto } from "../api/category.dto";
import { categoryService } from "../di/category.di";

export function useCreateCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (dto: CreateCategoryDto) => {
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
