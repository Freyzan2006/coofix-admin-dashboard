import type { BaseResponse } from "@shared/api/rest-api/types";
import type { BrandModel } from "../model/brand.model";

export interface BrandsDto extends BaseResponse {
	brands: BrandModel[];
}

export interface BrandDto extends BaseResponse {
	brand: BrandModel;
}

interface BrandPayload {
	name: string;
	image: string;
}

export type CreateBrandDto = BrandPayload;
export type UpdateBrandDto = BrandPayload;
