import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@shared/ui/modal";
import { type TabItem, Tabs } from "@shared/ui/tabs";
import { InfoIcon, TrashIcon } from "lucide-react";
import type React from "react";
import { DeleteCategoryConfirmation } from "../features/DeleteCategoryConfirmation.feature";
import { DetailsCategory } from "../features/details";
import { useCategoryActionsStore } from "../store/category-action.store";

/**
 * Компонент для отображения modal с действиями над категорией
 *
 * @returns React.FC
 */
export const CategoriesActions: React.FC = () => {
	const { isModalOpen, setIsModalOpen, selected, activeTab, setActiveTab } =
		useCategoryActionsStore();

	const tabs: TabItem[] = [
		{
			id: "details",
			label: "Подробнее",
			icon: <InfoIcon />,
			content: selected && <DetailsCategory category={selected} />,
		},
		{
			id: "delete",
			label: "Удалить",
			icon: <TrashIcon />,
			content: selected && <DeleteCategoryConfirmation category={selected} />,
		},
	];

	return (
		<Modal controlledOpen={isModalOpen} onOpenChange={(v) => setIsModalOpen(v)}>
			<ModalContent size="lg" className="min-h-[750px]">
				<ModalHeader
					title={selected ? selected.name : "Категория"}
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
