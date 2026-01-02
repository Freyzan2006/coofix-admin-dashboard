import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
} from "@shared/ui/modal";

import { PlusIcon } from "lucide-react";
import type React from "react";

import { FormCreateProduct } from "./FormCreateProduct";

export const CreateProductModal: React.FC = () => {
	return (
		<Modal>
			<ModalTrigger className="btn btn-primary">
				<PlusIcon /> Создать продукт
			</ModalTrigger>

			<ModalContent size="lg">
				<ModalHeader
					title="Создание продукта"
					description="Заполните все необходимые поля"
				/>

				<FormCreateProduct />

				<ModalFooter>
					<ModalClose>Отменить</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
