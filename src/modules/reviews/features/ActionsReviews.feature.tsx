import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@shared/ui/modal";
import { type TabItem, Tabs } from "@shared/ui/tabs";
import { InfoIcon, MailPlusIcon } from "lucide-react";
import type React from "react";
import { useReviewsActionsStore } from "../reviews.store";
import { ListReviews } from "../ui/ListReviews.ui";
import { MutationReviews } from "./MutationReviews.feature";

/**
 * Компонент для отображения modal с действиями над продуктом
 *
 * @returns React.FC
 */
export const ActionsReviews: React.FC = () => {
	const { isModalOpen, setIsModalOpen, selected, activeTab, setActiveTab } =
		useReviewsActionsStore();

	const tabs: TabItem[] = [
		{
			id: "details",
			label: "Отзывы",
			icon: <InfoIcon />,
			content: <ListReviews productId={selected} />,
		},
		{
			id: "create",
			label: "Создать отзыв",
			icon: <MailPlusIcon />,
			content: <MutationReviews productId={selected} />,
		},
	];

	return (
		<Modal controlledOpen={isModalOpen} onOpenChange={(v) => setIsModalOpen(v)}>
			<ModalContent size="lg" className="min-h-[750px]">
				<ModalHeader title={"Отзывы"} description="Выберите действие" />

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
