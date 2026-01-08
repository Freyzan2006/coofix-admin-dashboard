import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { categoryService } from "../category.factory";

export function useDeleteCategory() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (id: string) => {
			await categoryService.deleteCategory(id);
		},
		onSuccess: () => {
			noticeToastSvc.success("Категория успешно удалена");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: () => {
			noticeToastSvc.error("Произошла ошибка при удалении категории");
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
