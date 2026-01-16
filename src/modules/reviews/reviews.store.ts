import { create } from "zustand";

const ReviewsActionsState = {
	isModalOpen: false,
	selected: null,
	activeTab: "details",
};

interface ReviewsActionsStore {
	isModalOpen: boolean;
	selected: string | null;
	activeTab: string;
	openModal: (id: string, frame?: string) => void;
	setIsModalOpen: (v: boolean) => void;
	setActiveTab: (tabsId: string) => void;
	closeModal: () => void;
}

const useReviewsActionsStore = create<ReviewsActionsStore>((set) => ({
	...ReviewsActionsState,
	openModal: (
		id: string,
		frame: typeof ReviewsActionsState.activeTab = "details",
	) => {
		set({ selected: id, activeTab: frame, isModalOpen: true });
	},
	closeModal: () => set({ isModalOpen: false }),
	setIsModalOpen: (v: boolean) => set({ isModalOpen: v }),
	setActiveTab: (frame: string) => set({ activeTab: frame }),
}));

export { useReviewsActionsStore };
