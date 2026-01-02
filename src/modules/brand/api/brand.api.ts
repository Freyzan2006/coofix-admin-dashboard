import type { RestApiCliType } from "@shared/api/rest-api/client";
import type { BrandModel } from "../model/brand.model";
import type {
	BrandDto,
	BrandsDto,
	CreateBrandDto,
	UpdateBrandDto,
} from "./brand.dto";

export interface IBrandApi {
	findAll(): Promise<BrandModel[]>;
	findBySlug(slug: string): Promise<BrandModel>;
	create(brand: CreateBrandDto): Promise<BrandModel>;
	delete(id: string): Promise<void>;
	update(id: string, brand: UpdateBrandDto): Promise<BrandModel>;
}

export class BrandRestApi implements IBrandApi {
	constructor(private readonly client: RestApiCliType) {}

	public async findAll(): Promise<BrandModel[]> {
		const response = await this.client.get<BrandsDto>("/brands");
		return response.data.brands;
	}
	public async findBySlug(slug: string): Promise<BrandModel> {
		const response = await this.client.get<BrandDto>(`/brands/${slug}`);
		return response.data.brand;
	}

	public async create(brand: CreateBrandDto): Promise<BrandModel> {
		const response = await this.client.post<BrandDto>("/brands", brand);
		return response.data.brand;
	}
	public async delete(id: string): Promise<void> {
		await this.client.delete(`/brands/${id}`);
	}
	public async update(id: string, brand: UpdateBrandDto): Promise<BrandModel> {
		const response = await this.client.put<BrandDto>(`/brands/${id}`, brand);
		return response.data.brand;
	}
}
