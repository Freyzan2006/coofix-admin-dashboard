import type { AxiosInstance } from "axios";
import type { CreateProductModel } from "../model/create-product.model";
import type { ProductModel, ProductsModel } from "../model/product.model";

interface IProductApi {
	findAll(page: number, limit: number): Promise<ProductsModel>;
	create(product: CreateProductModel): Promise<ProductModel>;
}

class ProductRestApi implements IProductApi {
	private readonly client: AxiosInstance;

	constructor(client: AxiosInstance) {
		this.client = client;
	}

	public async findAll(page: number, limit: number): Promise<ProductsModel> {
		const response = await this.client.get<ProductsModel>("/products", {
			params: {
				page,
				limit,
			},
		});
		return response.data;
	}

	public async create(product: CreateProductModel): Promise<ProductModel> {
		const response = await this.client.post<ProductModel>(
			"/admin/products",
			product,
		);
		return response.data;
	}
}

export { ProductRestApi };
export type { IProductApi };
