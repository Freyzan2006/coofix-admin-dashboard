import type { AxiosInstance } from "axios";
import type { ProductsModel } from "../model/product.model";

interface IProductApi {
	findAll(page: number, limit: number): Promise<ProductsModel>;
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
}

export { ProductRestApi };
export type { IProductApi };
