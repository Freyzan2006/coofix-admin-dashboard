import type { RestApiCliType } from "@shared/api/rest-api/client";
import type { OrderCreateDto, OrderStatus, OrdersDto } from "./order.dto";

export interface IOrderApi {
	findAll(): Promise<OrdersDto>;
	updateStatus(id: string, status: OrderStatus): Promise<OrdersDto>;
	create(order: OrderCreateDto): Promise<OrdersDto>;
}

export class OrderRestApi implements IOrderApi {
	constructor(private readonly client: RestApiCliType) {}

	public async findAll(): Promise<OrdersDto> {
		const response = await this.client.get<OrdersDto>("/orders");
		return response.data;
	}
	public async updateStatus(
		orderId: string,
		status: OrderStatus,
	): Promise<OrdersDto> {
		const response = await this.client.patch<OrdersDto>(
			`/orders/${orderId}/status`,
			{ status },
		);
		return response.data;
	}
	public async create(order: OrderCreateDto): Promise<OrdersDto> {
		const response = await this.client.post<OrdersDto>("/orders", order);
		return response.data;
	}
}
