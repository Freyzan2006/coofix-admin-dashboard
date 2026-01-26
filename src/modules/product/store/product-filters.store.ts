import { create } from "zustand";
import type { ProductFiltersDto } from "../product.dto";

type TProductFiltersState = {
	filters: ProductFiltersDto;
	setFilters: (filters: ProductFiltersDto) => void;
	clearCategory: () => void;
	clearBrand: () => void;
	clearMaxPrice: () => void;
	clearMinPrice: () => void;
};

const useProductFiltersStore = create<TProductFiltersState>((set) => ({
	filters: {
		category: "",
		brand: "",
		minPrice: 0,
		maxPrice: 0,
	},

	setFilters: (filters) => set({ filters }),

	clearCategory: () =>
		set((state) => ({
			filters: { ...state.filters, category: "" },
		})),

	clearBrand: () =>
		set((state) => ({
			filters: { ...state.filters, brand: "" },
		})),

	clearMinPrice: () =>
		set((state) => ({
			filters: { ...state.filters, minPrice: 0 },
		})),

	clearMaxPrice: () =>
		set((state) => ({
			filters: { ...state.filters, maxPrice: 0 },
		})),
}));

export { useProductFiltersStore };
