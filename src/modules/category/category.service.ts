import type { IUploadImageMapper, IUploadImageService } from "@modules/upload";
import type { ICategoryApi } from "./category.api";
import type { UpdateCategoryDto } from "./category.dto";
import type {
	CategoryModel,
	CreateCategoryModel,
	UpdateCategoryModel,
} from "./category.model";

export interface ICategoryService {
	getAllCategories(): Promise<CategoryModel[]>;
	getCategoryBySlug(slug: string): Promise<CategoryModel>;
	createCategory(category: CreateCategoryModel): Promise<CategoryModel>;
	updateCategory(
		id: string,
		category: UpdateCategoryModel,
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
		category: CreateCategoryModel,
	): Promise<CategoryModel> {
		return await this.api.create(category);
	}

	public async updateCategory(
		id: string,
		category: UpdateCategoryModel,
	): Promise<CategoryModel> {
		console.log(this.uploadImageMapper.toUrl(category.image));

		const uploadedUrl =
			category.image?.kind === "local"
				? await this.uploadImageService.uploadImage(category.image.file)
				: category.image?.url;

		const dto: UpdateCategoryDto = {
			name: category.name,
			parent: category.parent,
			image: uploadedUrl || "",
		};

		console.log(dto);

		return await this.api.update(id, dto);
	}

	public async deleteCategory(id: string): Promise<void> {
		await this.api.delete(id);
	}
}
