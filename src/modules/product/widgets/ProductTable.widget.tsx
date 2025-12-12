import { Card } from "@shared/ui/Card.ui";
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
import { PackageSearch } from "lucide-react";

import { useProducts } from "../hooks/useProducts.hook";
import { Alert } from "@shared/ui/Alert.ui";
import { Pagination } from "@shared/ui/Pagination.ui";
import { useState } from "react";

const headerTable = [
	"ID",
	"name",
	"slug",
	"description",
	"price",
	"oldPrice",
	"category",
	"brand",
	"images",
	"characteristics",
	"inStock",
	"quantity",
	"isNew",
	"isSale",
	"ratingAvg",
	"ratingCount",
	"createdAt",
];

export const ProductTable: React.FC = () => {
	const { products, total, isError, isLoading, error } = useProducts();
	const [currentPage, setCurrentPage] = useState<number>(1);

	if (isError) return <Alert variant="danger">{error?.message}</Alert>;
	if (products.length === 0) return <Alert variant="primary">Нет данных</Alert>;

	const handlerPageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<Card className="gap-3">
			<div className="flex items-center gap-3 justify-between">
				<div className="flex items-center gap-3">
					<PackageSearch />
					<Heading>Таблица с продуктами</Heading>
				</div>
				<Pagination
					current={currentPage}
					total={total}
					onChange={handlerPageChange}
				/>
			</div>

			{isLoading ? (
				<TableSkeleton row={5} />
			) : (
				<Table>
					<Thead>
						<TableRow>
							{headerTable.map((item) => (
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
		</Card>
	);
};
