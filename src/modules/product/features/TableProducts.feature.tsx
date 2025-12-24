import { Alert } from "@shared/ui/Alert.ui";
import { Pagination } from "@shared/ui/Pagination.ui";
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
import { CopyText, Heading } from "@shared/ui/text";
import { PackageSearchIcon } from "lucide-react";
import { useProducts } from "../hooks/useProducts.hook";
import { useProductStore } from "../store/product.store";

export const TableProducts: React.FC = () => {
	const { headerTable } = useProductStore();

	const {
		products,
		total,
		isError,
		isLoading,
		error,
		currentPage,
		handlerPageChange,
		limit,
	} = useProducts();

	if (isError) return <Alert variant="danger">{error?.message}</Alert>;

	const totalPages = Math.ceil(total / limit) || 1;

	return (
		<>
			<Space align="center" justify="between" gap={3}>
				<Space align="center" gap={3}>
					<PackageSearchIcon />
					<Heading>Таблица с продуктами</Heading>
				</Space>
				{totalPages > 1 && (
					<Pagination
						current={currentPage}
						total={totalPages}
						onChange={handlerPageChange}
					/>
				)}
			</Space>

			{isLoading ? (
				<TableSkeleton row={limit + 1} />
			) : (
				<Table>
					<Thead>
						<TableRow>
							{headerTable.map((item: string) => (
								<TableHeader key={item.toString()}>{item}</TableHeader>
							))}
						</TableRow>
					</Thead>
					<Tbody>
						{products.map((item) => (
							<TableRow key={item._id}>
								<TableData>
									<CopyText title={item._id} slice={20} text={item._id} />
								</TableData>
								<TableData>
									<CopyText title={item.name} slice={20} text={item.name} />
								</TableData>
								<TableData>
									<CopyText title={item.slug} slice={20} text={item.slug} />
								</TableData>
								<TableData>
									<CopyText
										title={item.description}
										slice={20}
										text={item.description}
									/>
								</TableData>
								<TableData>
									<CopyText
										title={String(item.price)}
										text={String(item.price)}
									/>
								</TableData>
								<TableData>
									<CopyText
										title={String(item.oldPrice)}
										text={String(item.oldPrice || "-")}
									/>
								</TableData>

								<TableData>
									<CopyText
										title={item.category?.name}
										text={item.category?.name}
										slice={20}
									/>
								</TableData>
								<TableData>
									<CopyText
										title={item.brand?.name}
										text={item.brand?.name}
										slice={20}
									/>
								</TableData>

								<TableData>
									<CopyText
										title={item.images.join(", ")}
										slice={20}
										text={String(item.images)}
									/>
								</TableData>

								<TableData>
									{Object.entries(item.characteristics ?? {})
										.map(([key, value]) => `${key}: ${value}`)
										.join(", ")}
								</TableData>

								<TableData>{item.inStock ? "Yes" : "No"}</TableData>
								<TableData>
									<CopyText
										title={String(item.quantity)}
										text={String(item.quantity)}
									/>
								</TableData>
								<TableData>{item.isNew ? "Yes" : "No"}</TableData>
								<TableData>{item.isSale ? "Yes" : "No"}</TableData>
								<TableData>
									<CopyText
										title={String(item.ratingAvg)}
										text={String(item.ratingAvg)}
									/>
								</TableData>
								<TableData>
									<CopyText
										title={String(item.ratingCount)}
										text={String(item.ratingCount)}
									/>
								</TableData>

								<TableData>
									{new Date(item.createdAt).toLocaleString()}
								</TableData>
							</TableRow>
						))}
					</Tbody>
				</Table>
			)}
		</>
	);
};
