import { Card } from "@shared/ui/Card.ui";

import { CreateProductModal } from "../features/CreateProduct.feature";
import { TableProducts } from "../features/TableProducts.feature";

export const ProductFrame: React.FC = () => {
	return (
		<Card className="gap-5">
			<TableProducts />
			<CreateProductModal />
		</Card>
	);
};
