import {
	factoryUploadImageMapper,
	factoryUploadImageService,
	UploadImageMapper,
} from "@modules/upload";
import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { ProductRestApi } from "./product.api";
import { ProductCharacteristicsMapper } from "./product.mapper";
import { type IProductService, ProductService } from "./product.service";

async function factoryProductService(): Promise<IProductService> {
	const uploadImageService = await factoryUploadImageService();
	const productCharacteristicsMapper = new ProductCharacteristicsMapper();
	const uploadImageMapper = new UploadImageMapper();

	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const productApi = new ProductRestApi(clientRestApi);
	const productService = new ProductService(
		productApi,
		uploadImageService,
		productCharacteristicsMapper,
		uploadImageMapper,
	);
	return productService;
}

export const productCharacteristicsMapper = new ProductCharacteristicsMapper();
export const uploadImageMapper = await factoryUploadImageMapper();
export const productService = await factoryProductService();
