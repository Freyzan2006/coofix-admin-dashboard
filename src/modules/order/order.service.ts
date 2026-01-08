import type { IOrderApi } from "./order.api";
import type { OrderCreateDto, OrderStatus, OrdersDto } from "./order.dto";

export interface IOrderService {
	makeOrder(order: OrderCreateDto): Promise<OrdersDto>;
	orders(): Promise<OrdersDto>;
	changeStatus(id: string, status: OrderStatus): Promise<OrdersDto>;
}

export class OrderService {
	constructor(private readonly orderApi: IOrderApi) {}

	public async makeOrder(order: OrderCreateDto): Promise<OrdersDto> {
		return await this.orderApi.create(order);
	}

	public async orders(): Promise<OrdersDto> {
		return await this.orderApi.findAll();
	}

	public async changeStatus(
		id: string,
		status: OrderStatus,
	): Promise<OrdersDto> {
		return await this.orderApi.updateStatus(id, status);
	}
}
