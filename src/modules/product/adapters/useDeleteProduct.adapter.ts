import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { productService } from "../product.di";

export function useDeleteProductAdapter(id: string) {
	const [confirmationDeleteInput, setConfirmationDeleteInput] =
		React.useState<string>("");
	const [isConfirmedError, setIsConfirmedError] =
		React.useState<boolean>(false);

	const { mutate, mutateAsync, isPending, isSuccess, isError } = useMutation({
		mutationFn: async () => {
			await productService.deleteProductById(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			noticeToastSvc.success("Продукт успешно удален");
			setIsConfirmedError(false);
		},
		onError: () => {
			noticeToastSvc.error("Произошла ошибка при удалении продукта");
			setIsConfirmedError(true);
		},
	});

	return {
		doDelete: mutate,
		doDeleteAsync: mutateAsync,
		isPending,
		isSuccess,
		isError,

		confirmationDeleteInput,
		setConfirmationDeleteInput,

		isConfirmedError,
		setIsConfirmedError,
	};
}
