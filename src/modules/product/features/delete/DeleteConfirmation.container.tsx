import { useDeleteProductAdapter } from "@modules/product/adapters/useDeleteProduct.adapter";
import type { ProductModel } from "@modules/product/product.model";
import { useProductActionsStore } from "@modules/product/store/product-actions.store";
import { toast } from "@shared/ui/toast";
import { useCallback } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation.ui";

interface IDeleteConfirmationProps {
	product: ProductModel;
}

export const DeleteConfirmationContainer: React.FC<
	IDeleteConfirmationProps
> = ({ product }) => {
	const {
		doDeleteAsync,
		isError,
		isPending,
		confirmationDeleteInput,
		setConfirmationDeleteInput,
		isConfirmedError,
		setIsConfirmedError,
	} = useDeleteProductAdapter(product._id);

	const { closeModal } = useProductActionsStore();

	const handlerDelete = useCallback(async () => {
		if (
			confirmationDeleteInput.trim().toLowerCase() !==
			product.name.trim().toLowerCase()
		) {
			toast.error("Подтвердите удаление");
			setIsConfirmedError(true);
			return;
		}

		await doDeleteAsync();
		if (!isError) closeModal();
	}, [
		doDeleteAsync,
		isError,
		closeModal,
		confirmationDeleteInput,
		product.name,
		setIsConfirmedError,
	]);

	return (
		<DeleteConfirmation
			product={product}
			isConfirmedError={isConfirmedError}
			isError={isError}
			isPending={isPending}
			confirmationDeleteInput={confirmationDeleteInput}
			setConfirmationDeleteInput={setConfirmationDeleteInput}
			handlerDelete={handlerDelete}
		/>
	);
};
