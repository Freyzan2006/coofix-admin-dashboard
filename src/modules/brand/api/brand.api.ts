import type { AxiosInstance } from "axios";
import type { BrandModel } from "../model/brand.model";
import type { BrandsDto } from "./brand.dto";

export interface IBrandApi {
	findAll(): Promise<BrandModel[]>;
	findBySlug(slug: string): Promise<BrandModel>;
}

export class BrandApi implements IBrandApi {
	private readonly client: AxiosInstance;
	constructor(client: AxiosInstance) {
		this.client = client;
	}

	public async findAll(): Promise<BrandModel[]> {
		const response = await this.client.get<BrandsDto>("/brands");
		return response.data.brands;
	}
	public async findBySlug(slug: string): Promise<BrandModel> {
		const response = await this.client.get<BrandModel>(`/brands/${slug}`);
		return response.data;
	}
}
