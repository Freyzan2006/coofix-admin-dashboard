import { noticeToastSvc } from "@modules/notification";
import { queryClient } from "@shared/api/tanstack-query";
import { useMutation } from "@tanstack/react-query";
import type { OrderStatus } from "../order.dto";
import { orderService } from "../order.factory";

export function useOrderChangeStatus(orderId: string) {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (status: OrderStatus) => {
			await orderService.changeStatus(orderId, status);
		},
		onSuccess: () => {
			noticeToastSvc.success("Статус заказа успешно изменен");
		},
		onError: () => {
			noticeToastSvc.error("Произошла ошибка при изменении статуса заказа");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});

	return {
		changeStatus: mutate,
		changeStatusAsync: mutateAsync,
		isErrorChangeStatus: isError,
		isPendingChangeStatus: isPending,
		isSuccessChangeStatus: isSuccess,
	};
}
