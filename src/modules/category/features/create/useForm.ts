import { useCategories } from "@modules/category/adapters/useCategories.hook";
import { useCreateCategory } from "@modules/category/adapters/useCreateCategory.hook";
import type {
	CategoryModel,
	MutationCategoryModel,
} from "@modules/category/category.model";
import { getDefaultValues } from "@modules/category/config";
import { useUploadForm } from "@modules/upload/features/image-dropzone-v2";
import { type SubmitHandler, useForm } from "react-hook-form";

export function useFormCategoryCreate() {
	const { createCategoryAsync } = useCreateCategory();
	const { categories, categoriesIsLoading, categoriesIsError } =
		useCategories();

	const methods = useForm<MutationCategoryModel>({
		defaultValues: getDefaultValues(categories[0]._id),
		mode: "onChange",
	});

	const images = useUploadForm<MutationCategoryModel>({
		name: "images",
		control: methods.control,
		minFiles: 0,
		maxFiles: 1,
		required: false,
		defaultValue: [],
	});

	const onSubmit: SubmitHandler<MutationCategoryModel> = async (data) => {
		await createCategoryAsync({
			name: data.name,
			parent: data.parent,
			images: data.images,
		});
	};

	const categoriesForForm = categories.map((category: CategoryModel) => {
		return {
			label: category.name,
			value: category._id,
		};
	});

	return {
		methods,
		onSubmit: methods.handleSubmit(onSubmit),
		isSubmitting: methods.formState.isSubmitting,

		categories: {
			data: categoriesForForm,
			isLoading: categoriesIsLoading,
			isError: categoriesIsError,
		},

		images,
	};
}
