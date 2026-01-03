import type { IUploadImageService } from "@modules/upload";
import type { IProductApi } from "../api/product.api";
import type {
	CreateProductDto,
	ProductFilterQueryParams,
	UpdateProductDto,
} from "../api/product.dto";
import type { CreateProductModel } from "../model/create-product.model";
import type { ProductModel, ProductsModel } from "../model/product.model";

interface IProductService {
	allProducts(page: number, limit: number): Promise<ProductsModel>;
	createProduct(product: CreateProductModel): Promise<ProductModel>;
	deleteProductById(id: string): Promise<void>;
	updateProductById(
		id: string,
		product: UpdateProductDto,
	): Promise<ProductModel>;
	updateQuantityProductById(
		id: string,
		quantity: number,
	): Promise<ProductModel>;
	findProductBySlug(slug: string): Promise<ProductModel>;
	searchProduct(query: string): Promise<ProductModel[]>;
	filterProduct(queries: ProductFilterQueryParams): Promise<ProductsModel>;
	getNewProducts(): Promise<ProductModel[]>;
	getSaleProducts(): Promise<ProductModel[]>;
}

class ProductService implements IProductService {
	constructor(
		private readonly productApi: IProductApi,
		private readonly uploadService: IUploadImageService,
	) {}

	public async updateProductById(
		id: string,
		product: UpdateProductDto,
	): Promise<ProductModel> {
		const response = await this.productApi.update(id, product);
		return response;
	}
	public async updateQuantityProductById(
		id: string,
		quantity: number,
	): Promise<ProductModel> {
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
	public async filterProduct(
		queries: ProductFilterQueryParams,
	): Promise<ProductsModel> {
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

	public async createProduct(
		product: CreateProductModel,
	): Promise<ProductModel> {
		const dto: CreateProductDto = {
			...product,
			images: [],
			characteristics: {},
		};

		if (product.images.length) {
			const urls = await this.uploadService.uploadImages(product.images);
			dto.images = urls;
		}

		dto.characteristics = Object.fromEntries(
			product.characteristics
				.filter((c) => c.name.trim())
				.map((c) => [c.name.trim(), c.value]),
		);

		const newProduct = await this.productApi.create(dto);
		return newProduct;
	}

	public async deleteProductById(id: string): Promise<void> {
		this.productApi.delete(id);
	}
}

export { ProductService };
export type { IProductService };
