import type { RestApiCliType } from "@shared/api/rest-api/client";

import type { ProductModel, ProductsModel } from "../model/product.model";
import type { CreateProductDto, ProductDto, ProductFilterQueryParams, UpdateProductDto } from "./product.dto";



interface IProductApi {
	findAll(page: number, limit: number): Promise<ProductsModel>;
	create(product: CreateProductDto): Promise<ProductModel>;
	delete(id: string): Promise<void>;
	update(id: string, product: UpdateProductDto): Promise<ProductModel>;
	updateStock(id: string, quantity: number): Promise<ProductModel>;
	findBySlug(slug: string): Promise<ProductModel>;
	findAllByNew(): Promise<ProductModel[]>;
	findAllBySale(): Promise<ProductModel[]>;
	search(query: string): Promise<ProductModel[]>;
	filter(queries: ProductFilterQueryParams): Promise<ProductsModel>;
}

class ProductRestApi implements IProductApi {
	constructor(private readonly client: RestApiCliType) {}

	public async update(id: string, product: UpdateProductDto): Promise<ProductModel> {
		const response = await this.client.put<ProductDto>(
			`/admin/products/${id}`,
			product,
		);
		return response.data.product;
	}
	public async updateStock(id: string, quantity: number): Promise<ProductModel> {
		const response = await this.client.patch<ProductDto>(
			`/admin/products/${id}/stock`,
			{ quantity },
		)

		return response.data.product;
	}
	public async findBySlug(slug: string): Promise<ProductModel> {
		const response = await this.client.get<ProductDto>(`/products/${slug}`);
		return response.data.product;
	}
	public async findAllByNew(): Promise<ProductModel[]> {
		const response = await this.client.get<ProductsModel>("/products/new");
		return response.data.products;
	}
	public async findAllBySale(): Promise<ProductModel[]> {
		const response = await this.client.get<ProductsModel>("/products/sale");
		return response.data.products;
	}
	public async search(query: string): Promise<ProductModel[]> {
		const response = await this.client.get<ProductsModel>(
			`/products/search?query=${query}`,
		)

		return response.data.products;
	}
	public async filter(queries: ProductFilterQueryParams): Promise<ProductsModel> {
		const response = await this.client.get<ProductsModel>("/products", {
			params: queries
		})

		return response.data;
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
