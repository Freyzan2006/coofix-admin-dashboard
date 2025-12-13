import { Button } from "@shared/ui/Button.ui";
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
} from "@shared/ui/modal";

export const CreateProductModal: React.FC = () => {
	return (
		<Modal>
			<ModalTrigger className="btn btn-primary">Создать продукт</ModalTrigger>

			<ModalContent size="lg">
				<ModalHeader
					title="Создание продукта"
					description="Заполните все необходимые поля"
				/>

				<form className="space-y-4"></form>

				<ModalFooter align="end">
					<ModalClose className="btn btn-ghost">Отмена</ModalClose>
					<Button type="submit" variant="success">
						Создать
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
