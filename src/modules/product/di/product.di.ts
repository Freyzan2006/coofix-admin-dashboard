import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { ProductRestApi } from "../api/product.api";
import {
	type IProductService,
	ProductService,
} from "../service/product.service";

async function factoryProductService(): Promise<IProductService> {
	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const productApi = new ProductRestApi(clientRestApi);
	const productService = new ProductService(productApi);
	return productService;
}

export const productService = await factoryProductService();
