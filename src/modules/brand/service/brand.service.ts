import type { IBrandApi } from "../api/brand.api";
import type { BrandModel } from "../model/brand.model";

export interface IBrandService {
	getAllBrands(): Promise<BrandModel[]>;
	getBrandBySlug(slug: string): Promise<BrandModel>;
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
}
