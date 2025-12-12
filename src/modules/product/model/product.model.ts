import type { BrandModel } from "@modules/brand";
import type { CategoryModel } from "@modules/category";

type CharacteristicsType = {
	[key: string]: string;
};

export interface ProductModel {
	_id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	oldPrice: number | null;
	category: CategoryModel;
	brand: BrandModel;
	images: string[];
	characteristics: CharacteristicsType;
	inStock: boolean;
	quantity: number;
	isNew: boolean;
	isSale: boolean;
	ratingAvg: number;
	ratingCount: number;
	createdAt: Date;
}

export interface ProductsModel {
	success: boolean;
	products: ProductModel[];
	total: number;
}
