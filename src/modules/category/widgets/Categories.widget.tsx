import { Card } from "@shared/ui/Card.ui";
import { Space } from "@shared/ui/Space.ui";

import { CategoryTable } from "../features/CategoryTable.feature";
import { CreateCategoryModal } from "../features/create";
import { CategoryInstructionsTable } from "../ui/CategoryInstructionsTable.ui";
import { CategoryTitle } from "../ui/CategoryTitle.ui";
import { CategoriesActions } from "./CategoriesActions.widget";

export const Categories: React.FC = () => {
	return (
		<Card>
			<Space gap={3} fullWidth axis="vertical">
				<CategoryTitle />
				<CategoryTable />
				<CategoryInstructionsTable />
				<CategoriesActions />
				<CreateCategoryModal />
			</Space>
		</Card>
	);
};
