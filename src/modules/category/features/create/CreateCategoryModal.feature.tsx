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

import { FormCreateCategory } from "./FormCreateCategory";

export const CreateCategoryModal: React.FC = () => {
	return (
		<Modal>
			<ModalTrigger className="btn btn-primary">
				<PlusIcon /> Создать категории
			</ModalTrigger>

			<ModalContent size="lg">
				<ModalHeader
					title="Создание категории"
					description="Заполните все необходимые поля"
				/>

				<FormCreateCategory />

				<ModalFooter>
					<ModalClose>Отменить</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
