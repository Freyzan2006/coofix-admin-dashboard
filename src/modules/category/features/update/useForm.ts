import { useCategories } from "@modules/category/adapters/useCategories.hook";
import { useUpdateCategoryAdapter } from "@modules/category/adapters/useUpdateCategory.adapter";
import { uploadImageMapper } from "@modules/category/category.factory";
import type {
	CategoryModel,
	MutationCategoryModel,
} from "@modules/category/category.model";
import { useUploadForm } from "@modules/upload/features/image-dropzone-v2";

import { type SubmitHandler, useForm } from "react-hook-form";

function defaultValues(category: CategoryModel): MutationCategoryModel {
	return {
		name: category.name,
		parent: category.parent,
		image: null,
	};
}

export function useFormCategoryUpdate(category: CategoryModel) {
	const { updateCategoryAsync } = useUpdateCategoryAdapter(category._id);
	const { categories, categoriesIsLoading, categoriesIsError } =
		useCategories();

	const methods = useForm<MutationCategoryModel>({
		defaultValues: defaultValues(category),
		mode: "onChange",
	});

	const defaultImages = category.image
		? [uploadImageMapper.toUploadedImage(category.image)]
		: [];

	const imagesField = useUploadForm<MutationCategoryModel>({
		name: "image",
		control: methods.control,
		minFiles: 0,
		maxFiles: 1,
		required: false,
		defaultValue: defaultImages,
	});

	const onSubmit: SubmitHandler<MutationCategoryModel> = async (data) => {
		console.log(data);
		await updateCategoryAsync({
			name: data.name,
			parent: data.parent,
			image: imagesField.field.value[0] || null,
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

		images: imagesField,
	};
}
