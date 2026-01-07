import type { RegisterOptions } from "react-hook-form";
import type { MutationCategoryModel } from "./category.model";

export const getDefaultValues = (parent: string): MutationCategoryModel => ({
	name: "",
	parent: parent,
	images: null,
});

type CategoryRules = {
	[K in keyof MutationCategoryModel]?: RegisterOptions<
		MutationCategoryModel,
		K
	>;
};

export const fieldsCategoryRules: CategoryRules = {
	name: {
		required: "Поле обязательно для заполнения",
		minLength: {
			value: 3,
			message: "Минимальная длина 3 символа категории",
		},
		maxLength: {
			value: 255,
			message: "Максимальная длина 255 символов категории",
		},
	},
	parent: {
		required: "Поле обязательно для заполнения",
	},
	images: {
		required: "Поле обязательно для заполнения",
	},
};
