import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@shared/ui/modal";
import { type TabItem, Tabs } from "@shared/ui/tabs";
import { InfoIcon, PenLineIcon } from "lucide-react";
import type React from "react";
import { useOrderActionsStore } from "../order.store";
import { DetailsOrder } from "./DetailsOrder.feature";
import { OrderStatusChange } from "./OrderStatusChange.feature";

/**
 * Компонент для отображения modal с действиями над категорией
 *
 * @returns React.FC
 */
export const OrdersActions: React.FC = () => {
	const { isModalOpen, setIsModalOpen, selected, activeTab, setActiveTab } =
		useOrderActionsStore();

	const tabs: TabItem[] = [
		{
			id: "details",
			label: "Подробнее",
			icon: <InfoIcon />,
			content: selected && <DetailsOrder order={selected} />,
		},
		{
			id: "status-change",
			label: "Изменить статус",
			icon: <PenLineIcon />,
			content: selected && <OrderStatusChange order={selected} />,
		},
	];

	return (
		<Modal controlledOpen={isModalOpen} onOpenChange={(v) => setIsModalOpen(v)}>
			<ModalContent size="lg" className="min-h-[750px]">
				<ModalHeader
					title={selected ? selected._id : "Категория"}
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
