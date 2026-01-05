import type { IUploadImageMapper, IUploadImageService } from "@modules/upload";
import type { UploadedImage } from "@modules/upload/types";
import type { IProductApi } from "./product.api";
import type {
	ProductFilterQueryParams,
	UpdateProductModel,
} from "./product.dto";
import type { ProductCharacteristicsMapper } from "./product.mapper";

import type {
	CreateProductModel,
	ProductModel,
	ProductsModel,
} from "./product.model";

interface IProductService {
	allProducts(page: number, limit: number): Promise<ProductsModel>;
	createProduct(
		product: CreateProductModel,
		images: UploadedImage[],
	): Promise<ProductModel>;
	deleteProductById(id: string): Promise<void>;
	updateProduct(
		id: string,
		data: UpdateProductModel,
		images: UploadedImage[],
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
		private readonly productCharacteristicsMapper: ProductCharacteristicsMapper,
		private readonly uploadImageMapper: IUploadImageMapper,
	) {}

	public async createProduct(
		product: CreateProductModel,
		images: UploadedImage[],
	): Promise<ProductModel> {
		const { remoteUrls, localFiles } = this.uploadImageMapper.split(images);

		const uploadedUrls = localFiles.length
			? await this.uploadService.uploadImages(localFiles)
			: [];

		return this.productApi.create({
			...product,
			characteristics: this.productCharacteristicsMapper.toDto(
				product.characteristics,
			),
			images: [...remoteUrls, ...uploadedUrls],
		});
	}

	public async updateProduct(
		id: string,
		data: UpdateProductModel,
		images: UploadedImage[],
	): Promise<ProductModel> {
		const { remoteUrls, localFiles } = this.uploadImageMapper.split(images);

		const uploadedUrls = localFiles.length
			? await this.uploadService.uploadImages(localFiles)
			: [];

		return this.productApi.update(id, {
			...data,
			characteristics: this.productCharacteristicsMapper.toDto(
				data.characteristics,
			),
			images: [...remoteUrls, ...uploadedUrls],
		});
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

	public async deleteProductById(id: string): Promise<void> {
		this.productApi.delete(id);
	}
}

export { ProductService };
export type { IProductService };
