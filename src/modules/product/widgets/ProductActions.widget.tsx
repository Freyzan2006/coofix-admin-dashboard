import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@shared/ui/modal";
import { type TabItem, Tabs } from "@shared/ui/tabs";
import { InfoIcon, SquarePenIcon, TrashIcon } from "lucide-react";
import type React from "react";
import { DeleteConfirmation } from "../features/DeleteConfirmation.feature";
import { DetailsProduct } from "../features/details";
import { EditProductForm } from "../features/EditProductForm.feature";

import { useProductActionsStore } from "../store/product-actions.store";

/**
 * Компонент для отображения modal с действиями над продуктом
 *
 * @returns React.FC
 */
export const ProductActions: React.FC = () => {
	const {
		isModalOpen,
		setIsModalOpen,
		selectedProduct,
		activeTab,
		setActiveTab,
	} = useProductActionsStore();

	const tabs: TabItem[] = [
		{
			id: "details",
			label: "Подробнее",
			icon: <InfoIcon />,
			content: selectedProduct && <DetailsProduct product={selectedProduct} />,
		},
		{
			id: "edit",
			label: "Редактировать",
			icon: <SquarePenIcon />,
			content: selectedProduct && <EditProductForm product={selectedProduct} />,
		},
		{
			id: "delete",
			label: "Удалить",
			icon: <TrashIcon />,
			content: selectedProduct && (
				<DeleteConfirmation product={selectedProduct} />
			),
		},
	];

	console.log(selectedProduct);

	return (
		<Modal controlledOpen={isModalOpen} onOpenChange={(v) => setIsModalOpen(v)}>
			<ModalContent size="lg" className="min-h-[750px]">
				<ModalHeader
					title={selectedProduct ? selectedProduct.name : "Продукт"}
					description="Выберите действие"
				/>

				<Tabs
					items={tabs}
					activeTab={activeTab}
					onChange={setActiveTab}
					variant="lifted"
					size="md"
					animated
					className="mb-8"
				/>

				<ModalFooter>
					<ModalClose>Закрыть</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
