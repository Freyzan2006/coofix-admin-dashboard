import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { BrandApi } from "../api/brand.api";
import { BrandService } from "../service/brand.service";

const clientRestApi = await newRestApiCli(
	environmentConfig.get<string>("VITE_API_URL"),
);
const brandApi = new BrandApi(clientRestApi);
export const brandService = new BrandService(brandApi);
