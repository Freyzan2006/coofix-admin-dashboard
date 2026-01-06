import { useCategories } from "@modules/category/adapters/useCategories.hook";
import { useUpdateCategoryAdapter } from "@modules/category/adapters/useUpdateCategory.adapter";

import type {
	CategoryModel,
	UpdateCategoryModel,
} from "@modules/category/category.model";

import { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

function defaultValues(category: CategoryModel): UpdateCategoryModel {
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

	const methods = useForm<UpdateCategoryModel>({
		defaultValues: defaultValues(category),
		mode: "onChange",
	});

	// const [images, setImages] = useState<UploadedImage>(
	// 	uploadImageMapper.toUploadedImage(category.image || ""),
	// );
	const fileInputRef = useRef<HTMLInputElement>(null);

	const onSubmit: SubmitHandler<UpdateCategoryModel> = async (data) => {
		console.log(data);
		await updateCategoryAsync({
			name: data.name,
			parent: data.parent,
			image: null,
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

		fileInputRef,
		onSubmit: methods.handleSubmit(onSubmit),
		isSubmitting: methods.formState.isSubmitting,

		categories: {
			data: categoriesForForm,
			isLoading: categoriesIsLoading,
			isError: categoriesIsError,
		},
	};
}
