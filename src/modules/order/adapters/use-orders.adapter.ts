import { useQuery } from "@tanstack/react-query";
import { orderService } from "../order.factory";

export function useOrdersAdapter() {
	const { data, isError, isLoading, error } = useQuery({
		queryKey: ["orders"],
		queryFn: async () => await orderService.orders(),
	});

	return {
		orders: data?.orders || [],
		isErrorOrders: isError,
		errorOrders: error,
		isLoadingOrders: isLoading,
	};
}
