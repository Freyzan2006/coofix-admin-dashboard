import { create } from "zustand";

const ProductState = {
	page: 1,
	limit: 2,
	headerTable: [
		"ID",
		"name",
		"slug",
		"description",
		"price",
		"oldPrice",
		"category",
		"brand",
		"images",
		"characteristics",
		"inStock",
		"quantity",
		"isNew",
		"isSale",
		"ratingAvg",
		"ratingCount",
		"createdAt",
	],
};

interface IProductStore {
	page: number;
	limit: number;
	headerTable: string[];
	setPage: (page: number) => void;
	setLimit: (limit: number) => void;
}

export const useProductStore = create<IProductStore>((set) => ({
	...ProductState,
	setPage: (page: number) => set({ page }),
	setLimit: (limit: number) => set({ limit }),
}));
