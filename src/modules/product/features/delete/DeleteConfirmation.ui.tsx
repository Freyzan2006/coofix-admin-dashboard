import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Input } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { Paragraph, Strong } from "@shared/ui/text";

import { TrashIcon } from "lucide-react";
import type React from "react";

import type { ProductModel } from "../../model/product.model";

interface IDeleteConfirmationProps {
	product: ProductModel;
	isError: boolean;
	isConfirmedError: boolean;
	isPending: boolean;
	confirmationDeleteInput: string;
	setConfirmationDeleteInput: React.Dispatch<React.SetStateAction<string>>;
	handlerDelete: () => Promise<void>;
}

export const DeleteConfirmation: React.FC<IDeleteConfirmationProps> = ({
	product,
	isError,
	isPending,
	confirmationDeleteInput,
	setConfirmationDeleteInput,
	handlerDelete,
	isConfirmedError,
}) => {
	return (
		<Space axis="vertical">
			{isError && (
				<Alert variant="danger">
					Не удалось удалить "Продукт". Попробуйте ещё потом.
				</Alert>
			)}
			<Paragraph variant="danger">
				Вы уверены что хотите удалить{" "}
				<Strong variant="info">{product.name}</Strong> ?
			</Paragraph>
			<Input
				value={confirmationDeleteInput}
				onChange={(e) => setConfirmationDeleteInput(e.target.value)}
				error={isConfirmedError ? "Подтвердите удаление" : ""}
			/>
			<Button onClick={handlerDelete} variant="danger" disabled={isPending}>
				<TrashIcon /> Подтвердить удаление
			</Button>
		</Space>
	);
};
