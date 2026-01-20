import { Input } from "@shared/ui/fields";

import { Space } from "@shared/ui/Space.ui";
import { Label } from "@shared/ui/text";
import { SearchIcon } from "lucide-react";
import { useSearchProductAdapter } from "../adapters/use-search-product.adapter";
import { useProductSearchStore } from "../store/product-search.store";
import { ProductList } from "./ProductList.feature";

export const SearchProduct: React.FC = () => {
	const { searchQuery, setSearchQuery } = useProductSearchStore();
	const { searchProducts } = useSearchProductAdapter();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<Space gap={4} axis="vertical">
			<Space justify="center" align="center">
				<Label>
					<SearchIcon />
				</Label>
				<Input
					placeholder="Введите название товара"
					value={searchQuery}
					onChange={handleSearch}
				/>
			</Space>
			<Space className="relative">
				<ProductList products={searchProducts} />
			</Space>
		</Space>
	);
};
