import { Card } from "@shared/ui/Card.ui";
import { CreateProductModal } from "../features/create";
import { PaginationProducts, TableProducts } from "../features/table";

import { ProductActions } from "./ProductActions.widget";

export const ProductFrame: React.FC = () => {
	return (
		<Card className="gap-5">
			<PaginationProducts />
			<TableProducts />

			<ProductActions />
			<CreateProductModal />
		</Card>
	);
};
