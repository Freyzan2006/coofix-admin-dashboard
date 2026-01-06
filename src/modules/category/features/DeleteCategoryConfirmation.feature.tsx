import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Input } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { Paragraph, Strong } from "@shared/ui/text";
import { toast } from "@shared/ui/toast";
import { TrashIcon } from "lucide-react";
import type React from "react";
import { useCallback } from "react";
import { useDeleteCategory } from "../adapters/useDeleteCategory.hook";
import type { CategoryModel } from "../category.model";
import { useCategoryActionsStore } from "../store/category-action.store";

interface IDeleteCategoryConfirmationProps {
	category: CategoryModel;
}

export const DeleteCategoryConfirmation: React.FC<
	IDeleteCategoryConfirmationProps
> = ({ category }) => {
	const {
		doDeleteAsync,
		isError,
		isPending,
		confirmationDeleteInput,
		setConfirmationDeleteInput,
	} = useDeleteCategory();

	const { closeModal } = useCategoryActionsStore();

	const handlerDelete = useCallback(async () => {
		if (
			confirmationDeleteInput.trim().toLowerCase() !==
			category.name.trim().toLowerCase()
		) {
			toast.error("Подтвердите удаление");
			return;
		}

		await doDeleteAsync(category._id);
		if (!isError) closeModal();
	}, [
		doDeleteAsync,
		isError,
		closeModal,
		confirmationDeleteInput,
		category.name,
		category._id,
	]);

	return (
		<Space axis="vertical">
			{isError && (
				<Alert variant="danger">
					Не удалось удалить "Категорию". Попробуйте ещё потом.
				</Alert>
			)}
			<Paragraph variant="danger">
				Вы уверены что хотите удалить{" "}
				<Strong variant="info">{category.name}</Strong> ?
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
