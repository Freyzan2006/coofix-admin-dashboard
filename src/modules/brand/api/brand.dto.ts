import type { BrandModel } from "../model/brand.model";

export interface BrandsDto {
	success: boolean;
	brands: BrandModel[];
}
