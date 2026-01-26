import { Input } from "@shared/ui/fields";

import { Space } from "@shared/ui/Space.ui";
import { SearchIcon } from "lucide-react";
import { useSearchProductAdapter } from "../adapters/use-search-product.adapter";
import { useProductSearchStore } from "../store/product-search.store";

import { ProductSearchedData } from "./ProductSearchedData.feature";

export const SearchProduct: React.FC = () => {
	const { searchQuery, setSearchQuery } = useProductSearchStore();
	const { searchProducts } = useSearchProductAdapter();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<Space gap={4} axis="vertical">
			<div className="relative flex-1">
				<SearchIcon className="absolute left-3 top-1/2 z-1 -translate-y-1/2 h-4 w-4 text-base-content/60" />
				<Input
					placeholder="Поиск по названию"
					value={searchQuery}
					onChange={handleSearch}
					className="pl-10 input-bordered"
				/>
				<Space className="relative">
					<ProductSearchedData products={searchProducts} />
				</Space>
			</div>
		</Space>
	);
};
