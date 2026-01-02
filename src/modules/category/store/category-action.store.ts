import { create } from "zustand";
import type { CategoryModel } from "../model/category.model";

const CategoryActionsState = {
	isModalOpen: false,
	selected: null,
	activeTab: "details",
};

interface CategoryActionsStore {
	isModalOpen: boolean;
	selected: CategoryModel | null;
	activeTab: string;
	openModal: (product: CategoryModel, frame?: string) => void;
	setIsModalOpen: (v: boolean) => void;
	setActiveTab: (tabsId: string) => void;
	closeModal: () => void;
}

const useCategoryActionsStore = create<CategoryActionsStore>((set) => ({
	...CategoryActionsState,
	openModal: (
		data: CategoryModel,
		frame: typeof CategoryActionsState.activeTab = "details",
	) => {
		set({ selected: data, activeTab: frame, isModalOpen: true });
	},
	closeModal: () => set({ isModalOpen: false }),
	setIsModalOpen: (v: boolean) => set({ isModalOpen: v }),
	setActiveTab: (frame: string) => set({ activeTab: frame }),
}));

export { useCategoryActionsStore };
