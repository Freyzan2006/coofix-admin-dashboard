import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Input } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { Paragraph, Strong } from "@shared/ui/text";
import { toast } from "@shared/ui/toast";
import { TrashIcon } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { useDeleteProduct } from "../adapters/useDeleteProduct.hook";
import type { ProductModel } from "../model/product.model";
import { useProductActionsStore } from "../store/product-actions.store";

interface IDeleteConfirmationProps {
	product: ProductModel;
}

export const DeleteConfirmation: React.FC<IDeleteConfirmationProps> = ({
	product,
}) => {
	const {
		doDeleteAsync,
		isError,
		isPending,
		confirmationDeleteInput,
		setConfirmationDeleteInput,
	} = useDeleteProduct(product._id);

	const { closeModal } = useProductActionsStore();

	const handlerDelete = useCallback(async () => {
		if (
			confirmationDeleteInput.trim().toLowerCase() !==
			product.name.trim().toLowerCase()
		) {
			toast.error("Подтвердите удаление");
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
	]);

	return (
		<Space axis="vertical">
			{isError && (
				<Alert variant="danger">
					Не удалось удалить "Продукт". Попробуйте ещё потом.
				</Alert>
			)}
			<Paragraph variant="danger">
				Вы уверены что хотите удалить{" "}
				<Strong variant="danger">{product.name}</Strong> ?
			</Paragraph>
			<Input
				value={confirmationDeleteInput}
				onChange={(e) => setConfirmationDeleteInput(e.target.value)}
			/>
			<Button onClick={handlerDelete} variant="danger" disabled={isPending}>
				<TrashIcon /> Подтвердить удаление
			</Button>
		</Space>
	);
};
