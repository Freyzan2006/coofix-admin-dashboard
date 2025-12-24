import type { CharacteristicsType } from "./types";

export interface CreateProductModel {
	name: string;
	description: string;
	price: number;
	oldPrice: number;
	category: string;
	brand: string;
	images: File[];
	characteristics: CharacteristicsType;
	quantity: number;
	isNew: boolean;
	isSale: boolean;
}
