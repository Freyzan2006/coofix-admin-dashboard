import { Card } from "@shared/ui/Card.ui";
import { ActionsReviews } from "../features/ActionsReviews.feature";
import { PaginationReviews } from "../features/PaginationReviews.feature";
import { TableReviews } from "./TableReviews.widget";

export const Reviews: React.FC = () => {
	return (
		<Card className="gap-5">
			<PaginationReviews />
			<TableReviews />

			<ActionsReviews />
		</Card>
	);
};
