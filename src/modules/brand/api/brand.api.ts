import type { RestApiCliType } from "@shared/api/rest-api/client";
import type { BrandModel } from "../model/brand.model";
import type { BrandsDto } from "./brand.dto";

export interface IBrandApi {
	findAll(): Promise<BrandModel[]>;
}

export class BrandRestApi implements IBrandApi {
	constructor(private readonly client: RestApiCliType) {}

	public async findAll(): Promise<BrandModel[]> {
		const response = await this.client.get<BrandsDto>("/brands");
		return response.data.brands;
	}
}
