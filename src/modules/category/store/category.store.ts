import { create } from "zustand";

interface ICategoryState {
	headerTable: string[];
}

export const useCategoryStore = create<ICategoryState>(() => ({
	headerTable: [
		"ID",
		"name",
		"slug",
		"parent",
		"image",
		"createdAt",
		"updatedAt",
	],
}));
