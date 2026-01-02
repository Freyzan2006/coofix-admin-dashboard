import type { BaseResponse } from "@shared/api/rest-api/types";
import type { CreateProductModel } from "../model/create-product.model";
import type { ProductModel } from "../model/product.model";

export interface ProductFilterQueryParams {
	category?: string;
	brand?: string;
	minPrice?: number;
	maxPrice?: number;
}

export type CreateProductDto = Omit<CreateProductModel, "characteristics"> & {
	characteristics: Record<string, string>;
};

export type UpdateProductDto = Omit<CreateProductModel, "characteristics"> & {
	characteristics: Record<string, string>;
};

export interface ProductDto extends BaseResponse {
	product: ProductModel;
}
