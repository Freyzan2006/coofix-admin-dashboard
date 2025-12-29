import type { IProductApi } from "../api/product.api";
import type { CreateProductModel } from "../model/create-product.model";
import type { ProductModel, ProductsModel } from "../model/product.model";

interface IProductService {
	allProducts(page: number, limit: number): Promise<ProductsModel>;
	createProduct(product: CreateProductModel): Promise<ProductModel>;
	deleteProductById(id: string): Promise<void>;
}

class ProductService implements IProductService {
	private readonly productApi: IProductApi;
	constructor(productApi: IProductApi) {
		this.productApi = productApi;
	}
	public async allProducts(
		page: number,
		limit: number,
	): Promise<ProductsModel> {
		const products = await this.productApi.findAll(page, limit);
		console.log("products", products);
		return products;
	}

	public async createProduct(
		product: CreateProductModel,
	): Promise<ProductModel> {
		const newProduct = await this.productApi.create(product);
		return newProduct;
	}

	public async deleteProductById(id: string): Promise<void> {
		this.productApi.delete(id);
	}
}

export { ProductService };
export type { IProductService };
