import type { RegisterOptions } from "react-hook-form";
import type { CreateCategoryModel } from "./category.model";

export const getDefaultValues = (parent: string): CreateCategoryModel => ({
	name: "",
	parent: parent,
	image: null,
});

type CategoryRules = {
	[K in keyof CreateCategoryModel]?: RegisterOptions<CreateCategoryModel, K>;
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
	image: {
		required: "Поле обязательно для заполнения",
	},
};
