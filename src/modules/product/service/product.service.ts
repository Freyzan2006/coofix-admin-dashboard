import type { IProductApi } from "../api/product.api";
import type { CreateProductDto, ProductFilterQueryParams, UpdateProductDto } from "../api/product.dto";

import type { ProductModel, ProductsModel } from "../model/product.model";

interface IProductService {
	allProducts(page: number, limit: number): Promise<ProductsModel>;
	createProduct(product: CreateProductDto): Promise<ProductModel>;
	deleteProductById(id: string): Promise<void>;
	updateProductById(id: string, product: UpdateProductDto): Promise<ProductModel>;
	updateQuantityProductById(id: string, quantity: number): Promise<ProductModel>;
	findProductBySlug(slug: string): Promise<ProductModel>;
	searchProduct(query: string): Promise<ProductModel[]>;
	filterProduct(queries: ProductFilterQueryParams): Promise<ProductsModel>;
	getNewProducts(): Promise<ProductModel[]>;
	getSaleProducts(): Promise<ProductModel[]>;
}

class ProductService implements IProductService {
	private readonly productApi: IProductApi;
	constructor(productApi: IProductApi) {
		this.productApi = productApi;
	}
	public async updateProductById(id: string, product: UpdateProductDto): Promise<ProductModel> {
		const response = await this.productApi.update(id, product);
		return response;
	}
	public async updateQuantityProductById(id: string, quantity: number): Promise<ProductModel> {
		const response = await this.productApi.updateStock(id, quantity);
		return response;
	}
	public async findProductBySlug(slug: string): Promise<ProductModel> {
		const response = await this.productApi.findBySlug(slug);
		return response;
	}
	public async searchProduct(query: string): Promise<ProductModel[]> {
		const response = await this.productApi.search(query);
		return response;
	}
	public async filterProduct(queries: ProductFilterQueryParams): Promise<ProductsModel> {
		const response = await this.productApi.filter(queries);
		return response;
	}
	public async getNewProducts(): Promise<ProductModel[]> {
		const response = await this.productApi.findAllByNew();
		return response;
	}
	public async getSaleProducts(): Promise<ProductModel[]> {
		return await this.productApi.findAllBySale();
	}
	public async allProducts(
		page: number,
		limit: number,
	): Promise<ProductsModel> {
		const products = await this.productApi.findAll(page, limit);
		return products;
	}

	public async createProduct(product: CreateProductDto): Promise<ProductModel> {
		const newProduct = await this.productApi.create(product);
		return newProduct;
	}

	public async deleteProductById(id: string): Promise<void> {
		this.productApi.delete(id);
	}
}

export { ProductService };
export type { IProductService };
