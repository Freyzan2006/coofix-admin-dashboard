import { useProductStore, useProductsAdapter } from "@modules/product";

import { useReviewsActionsStore } from "@modules/reviews/reviews.store";
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

export const TableReviews: React.FC = () => {
	const { headerTable } = useProductStore();
	const { openModal } = useReviewsActionsStore();

	const { products, isError, isLoading, error, limit } = useProductsAdapter();

	if (isError) return <Alert variant="danger">{error?.message}</Alert>;

	return (
		<Space className="w-full">
			{isLoading ? (
				<TableSkeleton className="min-h-[150px]" row={limit + 1} />
			) : (
				<Table className="min-h-[150px]">
					<Thead>
						<TableRow>
							{headerTable.map((item: string) => (
								<TableHeader key={item}>{item}</TableHeader>
							))}
						</TableRow>
					</Thead>
					<Tbody>
						{products.map((item) => (
							<TableRow
								key={item._id}
								className="hover:bg-base-200 cursor-pointer"
								onClick={() => openModal(item._id, "details")}
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
									<SliceText text={item.description} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.price)} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.oldPrice || "-")} slice={20} />
								</TableData>
								<TableData>
									<SliceText
										text={String(item.category?.name || "-")}
										slice={20}
									/>
								</TableData>
								<TableData>
									<SliceText
										text={String(item.brand?.name || "-")}
										slice={20}
									/>
								</TableData>
								<TableData>
									<SliceText
										text={item.images.map((image) => image.url).join(", ")}
										slice={20}
									/>
								</TableData>
								<TableData>
									{Object.entries(item.characteristics ?? {})
										.map(([key, value]) => `${key}: ${value}`)
										.join(", ")}
								</TableData>
								<TableData>
									<SliceText text={item.inStock ? "Yes" : "No"} />
								</TableData>
								<TableData>
									<SliceText text={item.isNew ? "Yes" : "No"} />
								</TableData>
								<TableData>
									<SliceText text={item.isSale ? "Yes" : "No"} />
								</TableData>
								<TableData>
									<SliceText text={String(item.ratingAvg)} />
								</TableData>
								<TableData>
									<SliceText text={String(item.ratingCount)} />
								</TableData>
								<TableData>
									<SliceText text={new Date(item.createdAt).toLocaleString()} />
								</TableData>
							</TableRow>
						))}
					</Tbody>
				</Table>
			)}
		</Space>
	);
};
