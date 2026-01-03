import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { productService } from "../di/product.di";

export function useDeleteProduct(id: string) {
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
			toast.success("Продукт успешно удален");
			setIsConfirmedError(false);
		},
		onError: () => {
			toast.error("Произошла ошибка при удалении продукта");
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
