import { queryClient } from "@app/providers/TanStackProvider";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import type { UpdateCategoryDto } from "../api/category.dto";
import { categoryService } from "../di/category.di";

type DtoData = { id: string; category: UpdateCategoryDto };

export function useUpdateCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (dto: DtoData) => {
			await categoryService.updateCategory(dto.id, dto.category);
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
