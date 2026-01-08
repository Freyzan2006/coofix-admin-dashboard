import { create } from "zustand";
import type { OrderDto } from "./order.dto";

const OrderActionsState = {
	isModalOpen: false,
	selected: null,
	activeTab: "details",
};

interface OrderActionsStore {
	isModalOpen: boolean;
	selected: OrderDto | null;
	activeTab: string;
	openModal: (product: OrderDto, frame?: string) => void;
	setIsModalOpen: (v: boolean) => void;
	setActiveTab: (tabsId: string) => void;
	closeModal: () => void;
}

const useOrderActionsStore = create<OrderActionsStore>((set) => ({
	...OrderActionsState,
	openModal: (
		data: OrderDto,
		frame: typeof OrderActionsState.activeTab = "details",
	) => {
		set({ selected: data, activeTab: frame, isModalOpen: true });
	},
	closeModal: () => set({ isModalOpen: false }),
	setIsModalOpen: (v: boolean) => set({ isModalOpen: v }),
	setActiveTab: (frame: string) => set({ activeTab: frame }),
}));

export { useOrderActionsStore };

interface IOrderState {
	headerTable: string[];
}

export const useOrderStore = create<IOrderState>(() => ({
	headerTable: [
		"ID",
		"user",
		"items",
		"total",
		"address",
		"phone",
		"status",
		"createdAt",
		"updatedAt",
	],
}));
