import type { ImageModel } from "@modules/upload";
import type { BaseResponse } from "@shared/api/rest-api/types";
import type {
	CharacteristicsModel,
	CreateProductModel,
	ProductModel,
} from "./product.model";

export interface ProductFilterQueryParams {
	category?: string;
	brand?: string;
	minPrice?: number;
	maxPrice?: number;
}

export interface CreateProductDto
	extends Omit<CreateProductModel, "characteristics" | "images"> {
	characteristics: Record<string, string>;
	images: ImageModel[];
}

export interface UpdateProductDto
	extends Omit<
		ProductModel,
		"images" | "brand" | "category" | "characteristics"
	> {
	characteristics: Record<string, string>;

	images: ImageModel[];
	brand: string;
	category: string;
}

export interface UpdateProductModel
	extends Omit<
		ProductModel,
		"images" | "brand" | "category" | "characteristics"
	> {
	data: CharacteristicsDto;
	characteristics: CharacteristicsModel[];
	images: File[];
	brand: string;
	category: string;
}

export interface ProductDto extends BaseResponse {
	product: ProductModel;
}

export type CharacteristicsDto = Record<string, string>;
