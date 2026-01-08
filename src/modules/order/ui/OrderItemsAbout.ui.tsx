import { DetailRow } from "@modules/common";
import { Space } from "@shared/ui/Space.ui";

import { buildOrderItemsDetails } from "../order.config";
import type { OrderItemDto } from "../order.dto";

interface IOrderItemsAboutProps {
	items: OrderItemDto[];
}

export const OrderItemsAbout: React.FC<IOrderItemsAboutProps> = ({ items }) => {
	const details = buildOrderItemsDetails(items);

	return (
		<Space axis="vertical" gap={2} fullWidth>
			{details.map(({ label, value }) => (
				<DetailRow key={label} label={label} value={value} />
			))}
		</Space>
	);
};
