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

export function cleanFilters<T extends Record<string, unknown>>(
	obj: T,
): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) =>
				value !== undefined &&
				value !== null &&
				value !== "" &&
				!(typeof value === "number" && Number.isNaN(value)),
		),
	) as Partial<T>;
}

const useProductFiltersStore = create<TProductFiltersState>((set) => ({
	filters: {},

	setFilters: (filters) => set({ filters }),

	clearCategory: () =>
		set((state) => ({
			filters: { ...state.filters, category: undefined },
		})),

	clearBrand: () =>
		set((state) => ({
			filters: { ...state.filters, brand: undefined },
		})),

	clearMinPrice: () =>
		set((state) => ({
			filters: { ...state.filters, minPrice: undefined },
		})),

	clearMaxPrice: () =>
		set((state) => ({
			filters: { ...state.filters, maxPrice: undefined },
		})),
}));

export { useProductFiltersStore };
