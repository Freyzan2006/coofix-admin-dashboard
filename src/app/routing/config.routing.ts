import {
	ChartAreaIcon,
	ChartBarStackedIcon,
	type LucideIcon,
	MessageSquareDiffIcon,
	PackageSearchIcon,
	SendToBackIcon,
	StarIcon,
} from "lucide-react";

interface ISideBarLink {
	to: string;
	label: string;
	icon: LucideIcon;
}

export const sideBarLinks: ISideBarLink[] = [
	{
		to: "/dashboard/analytics",
		label: "Аналитика",
		icon: ChartAreaIcon,
	},
	{
		to: "/dashboard/products",
		label: "Продукты",
		icon: PackageSearchIcon,
	},
	{
		to: "/dashboard/categories",
		label: "Категории",
		icon: ChartBarStackedIcon,
	},
	{
		to: "/dashboard/orders",
		label: "Заказы",
		icon: SendToBackIcon,
	},
	{
		to: "/dashboard/reviews",
		label: "Отзывы",
		icon: MessageSquareDiffIcon,
	},
	{
		to: "/dashboard/favorites",
		label: "Избранное",
		icon: StarIcon,
	},
];
