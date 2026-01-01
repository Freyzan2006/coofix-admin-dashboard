import { Card } from "@shared/ui/Card.ui";

import { CreateProduct } from "../features/create";
import { PaginationProducts } from "../features/PaginationProducts.feature";
import { TableProducts } from "../features/TableProducts.feature";
import { InstructionsTable } from "../ui/InstructionsTable";
import { ProductActions } from "./ProductActions.widget";

export const ProductFrame: React.FC = () => {
	return (
		<Card className="gap-5">
			<PaginationProducts />
			<TableProducts />
			<InstructionsTable />
			<ProductActions />
			<CreateProduct />
		</Card>
	);
};
