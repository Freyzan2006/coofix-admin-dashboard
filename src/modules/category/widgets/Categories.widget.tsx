import { Button } from "@shared/ui/Button.ui";
import { Card } from "@shared/ui/Card.ui";
import { Space } from "@shared/ui/Space.ui";
import { useCreateCategory } from "../adapters/useCreateCategory.hook";
import { useDeleteCategory } from "../adapters/useDeleteCategory.hook";
import { useDetailsCategory } from "../adapters/useDetailsCategory.hook";
import { useUpdateCategory } from "../adapters/useUpdateCategory.hook";
import { CategoryTable } from "../features/CategoryTable.feature";
import { CategoryInstructionsTable } from "../ui/CategoryInstructionsTable.ui";
import { CategoryTitle } from "../ui/CategoryTitle.ui";

export const Categories: React.FC = () => {
	const { createCategoryAsync } = useCreateCategory();
	const { updateCategoryAsync } = useUpdateCategory();
	const { deleteCategoryAsync } = useDeleteCategory();
	const { category } = useDetailsCategory("");

	const handler = async (run: boolean) => {
		if (!run) return;
		await createCategoryAsync({
			name: "test",
			slug: "test",
			parent: "",
			image: "",
		});
		await updateCategoryAsync({
			id: "1",
			dto: { name: "test", slug: "test", parent: "", image: "" },
		});
		await deleteCategoryAsync("1");
		console.log(category);
	};

	return (
		<Card>
			<Space gap={3} fullWidth axis="vertical">
				<CategoryTitle />
				<CategoryTable />
				<CategoryInstructionsTable />

				<Button onClick={() => handler(false)}>test</Button>
			</Space>
		</Card>
	);
};
