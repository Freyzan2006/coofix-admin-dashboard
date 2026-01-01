import { queryClient } from "@app/providers/TanStackProvider";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { categoryService } from "../di/category.di";

export function useDeleteCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (id: string) => {
			await categoryService.deleteCategory(id);
		},
		onSuccess: () => {
			toast.success("Категория успешно удалена");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: () => {
			toast.error("Произошла ошибка при удалении категории");
		},
	});

	return {
		deleteCategory: mutate,
		deleteCategoryAsync: mutateAsync,
		isErrorDeleteCategory: isError,
		isPendingCategory: isPending,
		isSuccessCategory: isSuccess,
	};
}
