import { EntityTitle, InstructionsTable } from "@modules/common";
import { Card } from "@shared/ui/Card.ui";
import { Space } from "@shared/ui/Space.ui";
import { CategoryTable } from "../features/CategoryTable.feature";
import { CreateCategoryModal } from "../features/create";
import { CategoriesActions } from "./CategoriesActions.widget";

export const Categories: React.FC = () => {
	return (
		<Card>
			<Space gap={3} fullWidth axis="vertical">
				<EntityTitle title="Категории продукта" />
				<CategoryTable />
				<InstructionsTable />
				<CategoriesActions />
				<CreateCategoryModal />
			</Space>
		</Card>
	);
};
