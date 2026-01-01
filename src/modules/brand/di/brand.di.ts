import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { BrandRestApi } from "../api/brand.api";
import { BrandService, type IBrandService } from "../service/brand.service";

async function factoryBrandService(): Promise<IBrandService> {
	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const brandApi = new BrandRestApi(clientRestApi);
	const brandService = new BrandService(brandApi);
	return brandService;
}

export const brandService = await factoryBrandService();
