import type { OrderDto, OrderItemDto } from "@modules/order/order.dto";
import type { UserModel } from "@modules/user";
import { CopyText } from "@shared/ui/text";

export const buildOrderDetails = (order: OrderDto) => [
	{
		label: "ID",
		value: <CopyText text={String(order._id)} />,
	},
	{
		label: "total",
		value: <CopyText text={String(order.total)} />,
	},
	{
		label: "address",
		value: <CopyText text={String(order.address)} />,
	},
	{
		label: "phone",
		value: <CopyText text={String(order.phone)} />,
	},
	{
		label: "status",
		value: <CopyText text={String(order.status)} />,
	},
	{
		label: "createdAt",
		value: <CopyText text={String(order.createdAt)} />,
	},
	{
		label: "updatedAt",
		value: <CopyText text={String(order.updatedAt)} />,
	},
];

export const buildOrderUserDetails = (user: UserModel) => [
	{
		label: "ID",
		value: <CopyText text={String(user._id)} />,
	},
	{
		label: "email",
		value: <CopyText text={String(user.email)} />,
	},
	{
		label: "name",
		value: <CopyText text={String(user.name)} />,
	},
	{
		label: "role",
		value: <CopyText text={String(user.role)} />,
	},
	{
		label: "status",
		value: <CopyText text={String(user.provider)} />,
	},
	{
		label: "createdAt",
		value: <CopyText text={String(user.createdAt)} />,
	},
	{
		label: "updatedAt",
		value: <CopyText text={String(user.updatedAt)} />,
	},
];

export const buildOrderItemsDetails = (orderItems: OrderItemDto[]) => {
	return orderItems.flatMap((item) => [
		{
			label: "ID",
			value: <CopyText text={item._id} />,
		},
		{
			label: "Продукт",
			value: item.product ? <CopyText text={item.product.name} /> : "-",
		},
		{
			label: "Цена одной штуки",
			value: <CopyText text={`${String(item.price)} $`} />,
		},
	]);
};
