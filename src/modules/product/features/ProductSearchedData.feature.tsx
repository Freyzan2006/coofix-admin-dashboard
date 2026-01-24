import { List, ListItem } from "@shared/ui/list";
import type { ProductModel } from "../product.model";
import { useProductSearchStore } from "../store/product-search.store";
import { ProductItem } from "../ui/ProductItem.ui";

interface IProductListProps {
	products: ProductModel[];
}

export const ProductSearchedData: React.FC<IProductListProps> = ({
	products,
}) => {
	const { searchQuery } = useProductSearchStore();

	const shouldSearch = searchQuery.length >= 2;

	const renderProductList = (products: ProductModel[]) => {
		return products.map((product) => (
			<ProductItem key={product._id} product={product} />
		));
	};

	return (
		<List
			variant="secondary"
			className="absolute top-0 left-0 max-w-[400px] w-full z-1 max-h-[300px] overflow-y-auto shadow-md"
		>
			{shouldSearch ? (
				products.length > 0 ? (
					renderProductList(products)
				) : (
					<ListItem>Не найдено</ListItem>
				)
			) : null}
		</List>
	);
};
