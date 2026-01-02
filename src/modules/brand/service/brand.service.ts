import type { IBrandApi } from "../api/brand.api";
import type { CreateBrandDto, UpdateBrandDto } from "../api/brand.dto";
import type { BrandModel } from "../model/brand.model";

export interface IBrandService {
	getAllBrands(): Promise<BrandModel[]>;
	getBrandBySlug(slug: string): Promise<BrandModel>;
	createBrand(brand: CreateBrandDto): Promise<BrandModel>;
	deleteBrand(id: string): Promise<void>;
	updateBrand(id: string, brand: UpdateBrandDto): Promise<BrandModel>;
}

export class BrandService implements IBrandService {
	private readonly brandApi: IBrandApi;
	constructor(brandApi: IBrandApi) {
		this.brandApi = brandApi;
	}

	public async getAllBrands(): Promise<BrandModel[]> {
		return this.brandApi.findAll();
	}

	public async getBrandBySlug(slug: string): Promise<BrandModel> {
		return this.brandApi.findBySlug(slug);
	}

	public async createBrand(brand: CreateBrandDto): Promise<BrandModel> {
		return this.brandApi.create(brand);
	}

	public async deleteBrand(id: string): Promise<void> {
		return this.brandApi.delete(id);
	}

	public async updateBrand(
		id: string,
		brand: UpdateBrandDto,
	): Promise<BrandModel> {
		return this.brandApi.update(id, brand);
	}
}
