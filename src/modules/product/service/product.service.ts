import type { IProductApi } from "../api/product.api";
import type { ProductsModel } from "../model/product.model";

interface IProductService {
	allProducts(page: number, limit: number): Promise<ProductsModel>;
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
}

export { ProductService };
export type { IProductService };
