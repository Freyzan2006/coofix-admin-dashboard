import type { OrderDto } from "@modules/order/order.dto";
import { Space } from "@shared/ui/Space.ui";
import { type TabItem, Tabs } from "@shared/ui/tabs";
import { Heading } from "@shared/ui/text";
import { InfoIcon, PackageSearchIcon, UserRoundSearchIcon } from "lucide-react";
import { useState } from "react";

import { OrderAbout } from "../ui/OrderAbout.ui";
import { OrderItemsAbout } from "../ui/OrderItemsAbout.ui";
import { OrderUserAbout } from "../ui/OrderUserAbout.ui";

interface IDetailsProductProps {
	order: OrderDto;
}

export const DetailsOrder: React.FC<IDetailsProductProps> = ({ order }) => {
	const [activeTab, setActiveTab] = useState("details-order");

	const tabs: TabItem[] = [
		{
			id: "details-order",
			label: "О заказе",
			icon: <InfoIcon />,
			content: <OrderAbout order={order} />,
		},
		{
			id: "details-product",
			label: "О продуктах",
			icon: <PackageSearchIcon />,
			content: <OrderItemsAbout items={order.items} />,
		},
		{
			id: "details-user",
			label: "О пользователе",
			icon: <UserRoundSearchIcon />,
			content: <OrderUserAbout user={order.user} />,
		},
	];

	return (
		<Space axis="vertical" align="start" gap={4}>
			<Heading variant="secondary">Подробная информация:</Heading>

			<Tabs
				items={tabs}
				activeTab={activeTab}
				onChange={setActiveTab}
				variant="lifted"
				size="md"
				animated
				className="mb-8"
			/>
		</Space>
	);
};
