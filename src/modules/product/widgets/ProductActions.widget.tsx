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
import { DeleteConfirmationContainer } from "../features/delete";
import { DetailsProduct } from "../features/details";
import { EditProduct } from "../features/update";
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
			content: selectedProduct && (
				<DetailsProduct slug={selectedProduct.slug} />
			),
		},
		{
			id: "edit",
			label: "Редактировать",
			icon: <SquarePenIcon />,
			content: selectedProduct && <EditProduct slug={selectedProduct.slug} />,
		},
		{
			id: "delete",
			label: "Удалить",
			icon: <TrashIcon />,
			content: selectedProduct && (
				<DeleteConfirmationContainer product={selectedProduct} />
			),
		},
	];

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
