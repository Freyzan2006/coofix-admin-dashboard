import type { AxiosInstance } from "axios";
import type { CreateProductDto } from "../model/create-product.model";
import type { ProductModel, ProductsModel } from "../model/product.model";

interface IProductApi {
	findAll(page: number, limit: number): Promise<ProductsModel>;
	create(product: CreateProductDto): Promise<ProductModel>;
	delete(id: string): Promise<void>;
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

	public async create(product: CreateProductDto): Promise<ProductModel> {
		const response = await this.client.post<ProductModel>(
			"/admin/products",
			product,
		);
		return response.data;
	}

	public async delete(id: string): Promise<void> {
		await this.client.delete(`/admin/products/${id}`);
	}
}

export { ProductRestApi };
export type { IProductApi };
