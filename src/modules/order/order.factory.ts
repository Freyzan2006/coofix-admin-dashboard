import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { OrderRestApi } from "./order.api";
import { type IOrderService, OrderService } from "./order.service";

async function factoryOrderService(): Promise<IOrderService> {
	const clientRestApi = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const orderApi = new OrderRestApi(clientRestApi);
	const orderService = new OrderService(orderApi);
	return orderService;
}

export const orderService = await factoryOrderService();
