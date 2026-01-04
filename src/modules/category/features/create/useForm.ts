import { useCategories } from "@modules/category/adapters/useCategories.hook";
import { useCreateCategory } from "@modules/category/adapters/useCreateCategory.hook";
import { getDefaultValues } from "@modules/category/config";
import type {
	CategoryModel,
	CreateCategoryModel,
} from "@modules/category/model/category.model";
import { type SubmitHandler, useForm } from "react-hook-form";

export function useFormCategoryCreate() {
	const { createCategoryAsync } = useCreateCategory();
	const { categories, categoriesIsLoading, categoriesIsError } =
		useCategories();

	const methods = useForm<CreateCategoryModel>({
		defaultValues: getDefaultValues(categories[0]._id),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<CreateCategoryModel> = async (data) => {
		await createCategoryAsync({
			name: data.name,
			parent: data.parent,
			image: data.image,
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
	};
}
