import type {
	ImageModel,
	IUploadImageMapper,
	IUploadImageService,
	UploadedImage,
} from "@modules/upload";
import type { ICategoryApi } from "./category.api";
import type { UpdateCategoryDto } from "./category.dto";
import type { CategoryModel, MutationCategoryModel } from "./category.model";

// type ImageInput = File | ImageModel;

export interface ICategoryService {
	getAllCategories(): Promise<CategoryModel[]>;
	getCategoryBySlug(slug: string): Promise<CategoryModel>;
	createCategory(category: MutationCategoryModel): Promise<CategoryModel>;
	updateCategory(
		id: string,
		category: MutationCategoryModel,
	): Promise<CategoryModel>;
	deleteCategory(id: string): Promise<void>;
}

export class CategoryService implements ICategoryService {
	constructor(
		private readonly api: ICategoryApi,
		public readonly uploadImageMapper: IUploadImageMapper,
		private readonly uploadImageService: IUploadImageService,
	) {}
	public async getAllCategories(): Promise<CategoryModel[]> {
		return await this.api.findAll();
	}

	public async getCategoryBySlug(slug: string): Promise<CategoryModel> {
		return await this.api.findBySlug(slug);
	}

	public async createCategory(
		category: MutationCategoryModel,
	): Promise<CategoryModel> {
		return await this.api.create(category);
	}

	private async resolveImage(
		image: UploadedImage | null,
	): Promise<ImageModel | undefined> {
		if (!image) return undefined;

		if (image.kind === "local" && image.file) {
			// загружаем новый файл
			const uploaded: ImageModel = await this.uploadImageService.uploadImage(
				image.file,
			);
			return uploaded; // { url, publicId }
		}

		if (image.kind === "remote" && image.url && image.id) {
			// старая картинка, оставляем как есть
			return { url: image.url, publicId: image.id };
		}

		return undefined; // на случай некорректного объекта
	}

	public async updateCategory(
		id: string,
		category: MutationCategoryModel,
	): Promise<CategoryModel> {
		console.log("Category Model:", category);

		const resolvedImage = await this.resolveImage(category.image);

		const dto: UpdateCategoryDto = {
			name: category.name,
			parent: category.parent,
			image: resolvedImage || null, // всегда объект { url, publicId } или undefined
		};

		console.log("Category DTO: ", dto);

		return await this.api.update(id, dto);
	}

	public async deleteCategory(id: string): Promise<void> {
		await this.api.delete(id);
	}
}
