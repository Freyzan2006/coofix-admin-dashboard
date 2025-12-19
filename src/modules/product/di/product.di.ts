import { newRestApiCli } from "@shared/api";
import { environmentConfig } from "@shared/config";
import { ProductRestApi } from "../api/product.api";
import { ProductService } from "../service/product.service";

const clientRestApi = await newRestApiCli(
	environmentConfig.get<string>("VITE_API_URL"),
);
const productApi = new ProductRestApi(clientRestApi);
export const productService = new ProductService(productApi);
