"use client";

import { useBrands } from "@modules/brand";
import { useCategories } from "@modules/category";
import { Card } from "@shared/ui/Card.ui";
import { Space } from "@shared/ui/Space.ui";
import { Tabs } from "@shared/ui/tabs";
import { Heading } from "@shared/ui/text";
import {
	LayoutGrid,
	PackageSearchIcon,
	Table as TableIcon,
} from "lucide-react";
import { useState } from "react";
import { useProductsAdapter } from "../adapters/use-products.adapter";
import { CreateProductModal } from "../features/create";
import { PaginationProducts, TableProducts } from "../features/table";
import { ProductActions } from "./ProductActions.widget";
import { ProductFilters } from "./ProductFilters.widget";
import { ProductList } from "./ProductList.widget";

export const ProductView: React.FC = () => {
	const { products, isError, isLoading, error, limit } = useProductsAdapter();

	const [activeView, setActiveView] = useState<string>("table");

	const tabItems = [
		{
			id: "table",
			label: "Таблица",
			icon: <TableIcon size={16} />,
			content: (
				<TableProducts
					products={products}
					isError={isError}
					isLoading={isLoading}
					error={error}
					limit={limit}
				/>
			),
		},
		{
			id: "list",
			label: "Карточки",
			icon: <LayoutGrid size={16} />,
			content: (
				<ProductList
					products={products}
					isLoading={isLoading}
					isError={isError}
					error={error}
					limit={limit}
				/>
			),
		},
	];

	const { brands } = useBrands();
	const { categories } = useCategories();

	return (
		<Card className="p-5 space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full ">
				<div className="flex flex-wrap  gap-3 w-full">
					<Space align="start" gap={3}>
						<PackageSearchIcon />
						<Heading>Таблица с продуктами</Heading>
					</Space>
					<ProductFilters
						onFilterChange={(newFilters) => {
							console.log("Фильтры изменились:", newFilters);
						}}
						categories={categories}
						brands={brands}
						className="mb-4"
					/>
					<PaginationProducts />
				</div>
			</div>

			{/* Основной контент с вкладками */}
			<Tabs
				items={tabItems}
				activeTab={activeView}
				onChange={setActiveView}
				variant="bordered"
				size="md"
				animated={true}
			/>

			<ProductActions />
			<CreateProductModal />
		</Card>
	);
};
