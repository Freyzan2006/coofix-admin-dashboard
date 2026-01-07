import type { IUploadImageMapper, IUploadImageService } from "@modules/upload";
import type { ICategoryApi } from "./category.api";
import type { UpdateCategoryDto } from "./category.dto";
import type { CategoryModel, MutationCategoryModel } from "./category.model";

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
		private readonly uploadImageMapper: IUploadImageMapper,
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

	public async updateCategory(
		id: string,
		category: MutationCategoryModel,
	): Promise<CategoryModel> {
		const { remoteUrls, localFiles } = this.uploadImageMapper.splits(
			category.images || [],
		);

		const uploadedUrls = localFiles.length
			? await this.uploadImageService.uploadImages(localFiles)
			: [];

		const dto: UpdateCategoryDto = {
			name: category.name,
			parent: category.parent,
			image: [...remoteUrls, ...uploadedUrls][0],
		};

		return await this.api.update(id, dto);
	}

	public async deleteCategory(id: string): Promise<void> {
		await this.api.delete(id);
	}
}
