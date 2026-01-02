import { Alert } from "@shared/ui/Alert.ui";
import { Space } from "@shared/ui/Space.ui";
import {
	Table,
	TableData,
	TableHeader,
	TableRow,
	TableSkeleton,
	Tbody,
	Thead,
} from "@shared/ui/table";
import { SliceText } from "@shared/ui/text";

import { useCategories } from "../adapters/useCategories.hook";
import { useCategoryStore } from "../store/category.store";

export const CategoryTable: React.FC = () => {
	const { headerTable } = useCategoryStore();

	const {
		categories,
		categoriesIsLoading,
		categoriesIsError,
		categoriesError,
	} = useCategories();

	if (categoriesIsError)
		return <Alert variant="danger">{categoriesError?.message}</Alert>;

	return (
		<Space fullWidth axis="vertical">
			{categoriesIsLoading ? (
				<TableSkeleton row={categories.length + 1} />
			) : (
				<Table>
					<Thead>
						<TableRow>
							{headerTable.map((item: string) => (
								<TableHeader key={item}>{item}</TableHeader>
							))}
						</TableRow>
					</Thead>
					<Tbody>
						{categories.map((item) => (
							<TableRow
								key={item._id}
								className="hover:bg-base-200 cursor-pointer"
							>
								<TableData>
									<SliceText text={item._id} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={item.name} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={item.slug} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.parent || "-")} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.image || "-")} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={new Date(item.createdAt).toLocaleString()} />
								</TableData>
								<TableData>
									<SliceText text={new Date(item.updatedAt).toLocaleString()} />
								</TableData>
							</TableRow>
						))}
					</Tbody>
				</Table>
			)}
		</Space>
	);
};
