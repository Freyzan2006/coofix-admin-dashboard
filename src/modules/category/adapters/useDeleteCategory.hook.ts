import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
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

	const [confirmationDeleteInput, setConfirmationDeleteInput] =
		useState<string>("");

	return {
		doDelete: mutate,
		doDeleteAsync: mutateAsync,
		isError: isError,
		isPending: isPending,
		isSuccess: isSuccess,

		confirmationDeleteInput,
		setConfirmationDeleteInput,
	};
}
