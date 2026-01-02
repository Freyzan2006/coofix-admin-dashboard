import {
	ChartBarStackedIcon,
	LayoutDashboardIcon,
	type LucideIcon,
	MessageSquareDiffIcon,
	PackageSearchIcon,
	SendToBackIcon,
	StarIcon,
	UserSearchIcon,
} from "lucide-react";

interface ISideBarLink {
	to: string;
	label: string;
	icon: LucideIcon;
}

export const sideBarLinks: ISideBarLink[] = [
	{
		to: "/dashboard",
		label: "Доска",
		icon: LayoutDashboardIcon,
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
		to: "/dashboard/users",
		label: "Пользователи",
		icon: UserSearchIcon,
	},
	{
		to: "/dashboard/reviews",
		label: "Отзывы",
		icon: MessageSquareDiffIcon,
	},
	{
		to: "/dashboard/orders",
		label: "Заказы",
		icon: SendToBackIcon,
	},
	{
		to: "/dashboard/favorites",
		label: "Избранное",
		icon: StarIcon,
	},
];
