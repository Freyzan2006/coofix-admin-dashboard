import { DetailRow } from "@modules/common";
import { Space } from "@shared/ui/Space.ui";
import { buildOrderDetails } from "../order.config";
import type { OrderDto } from "../order.dto";

interface IOrderAboutProps {
	order: OrderDto;
}

export const OrderAbout: React.FC<IOrderAboutProps> = ({ order }) => {
	const details = buildOrderDetails(order);

	return (
		<Space axis="vertical" gap={2} fullWidth>
			{details.map(({ label, value }) => (
				<DetailRow key={label} label={label} value={value} />
			))}
		</Space>
	);
};
