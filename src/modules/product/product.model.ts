import type { BrandModel } from "@modules/brand";
import type { CategoryModel } from "@modules/category";
import type { ImageModel } from "@modules/upload";
import type { CharacteristicsDto } from "./product.dto";

export interface ProductModel {
	_id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	oldPrice: number | null;
	category: CategoryModel;
	brand: BrandModel;
	images: ImageModel[];
	characteristics?: CharacteristicsDto;
	inStock: boolean;
	isNew: boolean;
	isSale: boolean;
	ratingAvg: number;
	ratingCount: number;
	stock: number;
	createdAt: Date;
}

export interface ProductsModel {
	success: boolean;
	products: ProductModel[];
	total: number;
}

type CharacteristicItem = {
	name: string;
	value: string;
};

export interface CreateProductModel {
	name: string;
	description: string;
	price: number;
	oldPrice: number;
	category: string;
	brand: string;
	images: File[];
	characteristics: CharacteristicItem[];
	isNew: boolean;
	isSale: boolean;
}

export interface CharacteristicsModel {
	name: string;
	value: string;
}
