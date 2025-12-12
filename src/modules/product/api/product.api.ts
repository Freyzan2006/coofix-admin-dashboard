import type { AxiosInstance } from "axios";
import type { ProductsModel } from "../model/product.model";

interface IProductApi {
	findAll(): Promise<ProductsModel>;
}

class ProductRestApi implements IProductApi {
	private readonly client: AxiosInstance;

	constructor(client: AxiosInstance) {
		this.client = client;
	}

	public async findAll(): Promise<ProductsModel> {
		const response = await this.client.get<ProductsModel>("/products");
		return response.data;
	}
}

export { ProductRestApi };
export type { IProductApi };
