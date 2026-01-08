import { noticeToastSvc } from "@modules/notification";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../di/auth.di";
import { useAuthStore } from "../store/auth.store";

export function useLogout() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async () => {
			await authApi.logout();
		},
		onSuccess: () => {
			useAuthStore.getState().setAccessToken(null);
			noticeToastSvc.success("Вы успешно вышли из системы");
		},
		onError: () => {
			noticeToastSvc.error("Произошла ошибка при выходе из системы");
		},
	});

	return {
		logout: mutate,
		logoutAsync: mutateAsync,
		isErrorLogout: isError,
		isPendingLogout: isPending,
		isSuccessLogout: isSuccess,
	};
}
