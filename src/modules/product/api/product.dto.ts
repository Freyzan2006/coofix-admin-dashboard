import type { BaseResponse } from "@shared/api/rest-api/types";
import type { CreateProductModel } from "../model/create-product.model";
import type { ProductModel } from "../model/product.model";
import type { CharacteristicsDto, CharacteristicsModel } from "../model/types";

export interface ProductFilterQueryParams {
	category?: string;
	brand?: string;
	minPrice?: number;
	maxPrice?: number;
}

// export type CreateProductDto = Omit<CreateProductModel, "characteristics"> & {
// 	characteristics: Record<string, string>;
// };

export interface CreateProductDto
	extends Omit<CreateProductModel, "characteristics" | "images"> {
	characteristics: Record<string, string>;
	images: string[];
}

export interface UpdateProductDto
	extends Omit<
		ProductModel,
		"images" | "brand" | "category" | "characteristics"
	> {
	characteristics: Record<string, string>;

	images: string[];
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
