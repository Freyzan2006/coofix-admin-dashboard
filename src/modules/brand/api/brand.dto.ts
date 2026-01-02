import type { BaseResponse } from "@shared/api/rest-api/types";
import type { BrandModel } from "../model/brand.model";

export interface BrandsDto extends BaseResponse {
	brands: BrandModel[];
}
