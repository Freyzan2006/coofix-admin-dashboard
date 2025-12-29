import { create } from "zustand";
import type { ProductModel } from "../model/product.model";

const ProductActionsState = {
	isModalOpen: false,
	selectedProduct: null,
	activeTab: "details",
};

interface ProductActionsStore {
	isModalOpen: boolean;
	selectedProduct: ProductModel | null;
	activeTab: string;
	openModal: (product: ProductModel, frame?: string) => void;
	setIsModalOpen: (v: boolean) => void;
	setActiveTab: (tabsId: string) => void;
	closeModal: () => void;
}

const useProductActionsStore = create<ProductActionsStore>((set) => ({
	...ProductActionsState,
	openModal: (
		product: ProductModel,
		frame: typeof ProductActionsState.activeTab = "details",
	) => {
		set({ selectedProduct: product, activeTab: frame, isModalOpen: true });
	},
	closeModal: () => set({ isModalOpen: false }),
	setIsModalOpen: (v: boolean) => set({ isModalOpen: v }),
	setActiveTab: (frame: string) => set({ activeTab: frame }),
}));

export { useProductActionsStore };
