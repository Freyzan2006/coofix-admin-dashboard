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
import { useOrdersAdapter } from "../adapters/use-orders.adapter";
import { useOrderActionsStore, useOrderStore } from "../order.store";

export const OrdersTable: React.FC = () => {
	const { headerTable } = useOrderStore();

	const { openModal } = useOrderActionsStore();

	const { orders, isErrorOrders, isLoadingOrders, errorOrders } =
		useOrdersAdapter();

	if (isErrorOrders)
		return <Alert variant="danger">{errorOrders?.message}</Alert>;

	return (
		<Space fullWidth axis="vertical">
			{isLoadingOrders ? (
				<TableSkeleton row={10 + 1} />
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
						{orders.map((item) => (
							<TableRow
								key={item._id}
								className="hover:bg-base-200 cursor-pointer"
								onClick={() => openModal(item)}
							>
								<TableData>
									<SliceText text={item._id} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.user.email)} slice={20} />
								</TableData>
								<TableData>
									<SliceText
										text={`${String(item.items.length)} шт`}
										slice={20}
									/>
								</TableData>
								<TableData>
									<SliceText text={String(item.total)} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.address)} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.phone)} slice={20} />
								</TableData>
								<TableData>
									<SliceText text={String(item.status)} slice={20} />
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
