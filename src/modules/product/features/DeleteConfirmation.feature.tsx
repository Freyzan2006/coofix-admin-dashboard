import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Space } from "@shared/ui/Space.ui";
import { Paragraph, Strong } from "@shared/ui/text";
import { TrashIcon } from "lucide-react";
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
	const { doDeleteAsync, isError, isPending } = useDeleteProduct(product._id);
	const { closeModal } = useProductActionsStore();

	const handlerDelete = useCallback(async () => {
		await doDeleteAsync();
		if (!isError) closeModal();
	}, [doDeleteAsync, isError, closeModal]);

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
			<Button onClick={handlerDelete} variant="danger" disabled={isPending}>
				<TrashIcon /> Подтвердить удаление
			</Button>
		</Space>
	);
};
