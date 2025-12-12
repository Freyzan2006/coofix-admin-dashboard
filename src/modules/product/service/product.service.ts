import type { ProductsModel } from "../model/product.model";
import type { IProductApi } from "../api/product.api";

interface IProductService {
	allProducts(): Promise<ProductsModel>;
}

class ProductService implements IProductService {
	private readonly productApi: IProductApi;
	constructor(productApi: IProductApi) {
		this.productApi = productApi;
	}
	public async allProducts(): Promise<ProductsModel> {
		const products = await this.productApi.findAll();
		console.log("products", products);
		return products;
	}
}

export { ProductService };
export type { IProductService };
