import type { ProductModel } from "@modules/product/product.model";
import { LinkApp } from "@shared/ui/Link.ui";
import { CopyText } from "@shared/ui/text";

export const buildProductDetails = (product: ProductModel) => [
	{
		label: "ID",
		value: <CopyText text={product._id} />,
	},
	{
		label: "Название",
		value: <CopyText text={product.name} />,
	},
	{
		label: "Описание",
		value: <CopyText text={product.description} />,
	},
	{
		label: "Цена",
		value: <CopyText text={`${product.price} руб.`} />,
	},
	{
		label: "Старая цена",
		value: <CopyText text={`${product.oldPrice ?? "-"} руб.`} />,
	},
	{
		label: "Количество",
		value: <CopyText text={`${product.quantity} шт.`} />,
	},
	{
		label: "Категория",
		value: (
			<LinkApp
				variant="success"
				to={`/dashboard/categories/${product.category.slug}`}
			>
				#{product.category.slug}
			</LinkApp>
		),
	},
	{
		label: "Бренд",
		value: (
			<LinkApp variant="success" to={`/dashboard/brands/${product.brand.slug}`}>
				#{product.brand.slug}
			</LinkApp>
		),
	},
	{
		label: "В наличии",
		value: <CopyText text={product.inStock ? "Да" : "Нет"} />,
	},
	{
		label: "Новинка",
		value: <CopyText text={product.isNew ? "Да" : "Нет"} />,
	},
	{
		label: "Распродажа",
		value: <CopyText text={product.isSale ? "Да" : "Нет"} />,
	},
	{
		label: "Средняя оценка",
		value: <CopyText text={`${product.ratingAvg} / 5`} />,
	},
	{
		label: "Количество отзывов",
		value: <CopyText text={`${product.ratingCount} шт.`} />,
	},
	{
		label: "Дата создания",
		value: <CopyText text={new Date(product.createdAt).toLocaleString()} />,
	},
];
