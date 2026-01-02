import type { CategoryModel } from "@modules/category/model/category.model";
import { CopyText } from "@shared/ui/text";

export const buildCategoryDetails = (category: CategoryModel) => [
	{
		label: "ID",
		value: <CopyText text={category._id} />,
	},
	{
		label: "Название",
		value: <CopyText text={category.name} />,
	},
	{
		label: "Дата создания",
		value: <CopyText text={new Date(category.createdAt).toLocaleString()} />,
	},
	{
		label: "Дата обновления",
		value: <CopyText text={new Date(category.updatedAt).toLocaleString()} />,
	},
];
