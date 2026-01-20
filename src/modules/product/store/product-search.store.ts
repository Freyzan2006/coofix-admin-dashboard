import { create } from "zustand";

interface IProductSearchStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const initState = {
	searchQuery: "",
};

const useProductSearchStore = create<IProductSearchStore>((set) => ({
	...initState,
	setSearchQuery: (query) => set({ searchQuery: query }),
}));

export { useProductSearchStore };
