import {
	factoryUploadImageMapper,
	factoryUploadImageService,
} from "@modules/upload";
import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { CategoryRestApi } from "./category.api";
import { CategoryService, type ICategoryService } from "./category.service";

async function factoryCategoryService(): Promise<ICategoryService> {
	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);

	const uploadImageMapper = await factoryUploadImageMapper();
	const uploadImageService = await factoryUploadImageService();

	const categoryApi = new CategoryRestApi(clientRestApi);
	const categoryService = new CategoryService(
		categoryApi,
		uploadImageMapper,
		uploadImageService,
	);

	return categoryService;
}

export const categoryService = await factoryCategoryService();
