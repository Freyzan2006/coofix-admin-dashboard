import { EntityTitle, InstructionsTable } from "@modules/common";
import { Card } from "@shared/ui/Card.ui";
import { Space } from "@shared/ui/Space.ui";
import { OrdersActions } from "../features/OrdersActions.feature";
import { OrdersTable } from "../features/OrdersTable.feature";

export const Orders: React.FC = () => {
	return (
		<Card>
			<Space gap={3} fullWidth axis="vertical">
				<EntityTitle title="Таблица с Заказами" />
				<OrdersTable />
				<InstructionsTable />
				<OrdersActions />
			</Space>
		</Card>
	);
};
