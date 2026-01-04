import type { IUploadImageMapper, IUploadImageService } from "@modules/upload";
import type { UploadedImage } from "@modules/upload/types";
import type { IProductApi } from "../api/product.api";
import type {
	CreateProductDto,
	ProductFilterQueryParams,
	UpdateProductModel,
} from "../api/product.dto";
import type { ProductCharacteristicsMapper } from "../mapper/product.mapper";
import type { CreateProductModel } from "../model/create-product.model";
import type { ProductModel, ProductsModel } from "../model/product.model";

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

	// public async updateProduct(
	// 	id: string,
	// 	data: UpdateProductModel,
	// 	images: UploadedImage[],
	// ): Promise<ProductModel> {

	// 	data.characteristics = this.productCharacteristicsMapper.toDto(data.characteristics);

	// 	const existingUrls = images
	// 		.filter((img) => img.kind === "remote")
	// 		.map((img) => img.url);

	// 	const newFiles = images
	// 		.filter((img) => img.kind === "local")
	// 		.map((img) => img.file);

	// 	const finalImages = [...existingUrls];

	// 	if (newFiles.length) {
	// 		const uploadedUrls = await this.uploadService.uploadImages(newFiles);
	// 		finalImages.push(...uploadedUrls);
	// 	}

	// 	return this.productApi.update(id, {
	// 		...data,
	// 		images: finalImages,
	// 	});
	// }

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

	// public async createProduct(
	// 	product: CreateProductModel,
	// ): Promise<ProductModel> {
	// 	const dto: CreateProductDto = {
	// 		...product,
	// 		images: [],
	// 		characteristics: {},
	// 	};

	// 	if (product.images.length) {
	// 		const urls = await this.uploadService.uploadImages(product.images);
	// 		dto.images = urls;
	// 	}

	// 	dto.characteristics = Object.fromEntries(
	// 		product.characteristics
	// 			.filter((c) => c.name.trim())
	// 			.map((c) => [c.name.trim(), c.value]),
	// 	);

	// 	const newProduct = await this.productApi.create(dto);
	// 	return newProduct;
	// }

	public async createProduct(
		product: CreateProductModel,
		images: UploadedImage[],
	): Promise<ProductModel> {
		const dto: CreateProductDto = {
			...product,
			images: [],
			characteristics: {},
		};

		const newFiles = images
			.filter((img) => img.kind === "local")
			.map((img) => img.file);
		const existingUrls = images
			.filter((img) => img.kind === "remote")
			.map((img) => img.url);

		const finalImages = [...existingUrls];
		if (newFiles.length) {
			const uploadedUrls = await this.uploadService.uploadImages(newFiles);
			finalImages.push(...uploadedUrls);
		}
		dto.images = finalImages;

		dto.characteristics = Object.fromEntries(
			product.characteristics
				.filter((c) => c.name.trim())
				.map((c) => [c.name.trim(), c.value]),
		);

		return this.productApi.create(dto);
	}

	public async deleteProductById(id: string): Promise<void> {
		this.productApi.delete(id);
	}
}

export { ProductService };
export type { IProductService };
