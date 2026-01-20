import { Card } from "@shared/ui/Card.ui";
import { useProductsAdapter } from "../adapters/use-products.adapter";
import { CreateProductModal } from "../features/create";
import { PaginationProducts, TableProducts } from "../features/table";
import { ProductActions } from "./ProductActions.widget";
import { SearchController } from "./SearchController.widget";

export const ProductFrame: React.FC = () => {
	const { products, isError, isLoading, error, limit } = useProductsAdapter();

	return (
		<Card className="gap-5">
			<PaginationProducts />
			<SearchController />
			<TableProducts
				products={products}
				isError={isError}
				isLoading={isLoading}
				error={error}
				limit={limit}
			/>

			<ProductActions />
			<CreateProductModal />
		</Card>
	);
};
