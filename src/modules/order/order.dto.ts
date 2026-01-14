import type { ProductModel } from "@modules/product";
import type { UserModel } from "@modules/user";

export type OrderStatus = "shipped" | "pending" | "canceled" | "delivered";

export interface OrderCreateDto {
	address: string;
	phone: string;
}

export interface OrdersDto {
	success: boolean;
	orders: OrderDto[];
}

export interface OrderDto {
	_id: string;
	user: UserModel;
	items: OrderItemDto[];
	total: number;
	address: string;
	phone: string;
	status: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemDto {
	_id: string;
	product: OrderProductDto | null;

	price: number;
}

export type OrderProductDto = Pick<
	ProductModel,
	"_id" | "name" | "price" | "images"
>;

export interface OrderCreateDto {
	address: string;
	phone: string;
}
