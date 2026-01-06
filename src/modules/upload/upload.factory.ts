import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { UploadRestApi } from "./upload.api";
import { type IUploadImageMapper, UploadImageMapper } from "./upload.mapper";
import { type IUploadImageService, UploadImageService } from "./upload.service";

async function factoryUploadImageService(): Promise<IUploadImageService> {
	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const uploadApi = new UploadRestApi(clientRestApi);
	const uploadImageService = new UploadImageService(uploadApi);
	return uploadImageService;
}

async function factoryUploadImageMapper(): Promise<IUploadImageMapper> {
	const uploadImageMapper = new UploadImageMapper();
	return uploadImageMapper;
}

export { factoryUploadImageService, factoryUploadImageMapper };
