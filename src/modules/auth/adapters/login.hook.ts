import { noticeToastSvc } from "@modules/notification";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../di/auth.di";
import type { LoginLocalDtoRequest } from "../login.dto";
import { useAuthStore } from "../store/auth.store";

export const useLoginLocal = () => {
	const mutation = useMutation({
		mutationFn: (data: LoginLocalDtoRequest) => authApi.loginLocal(data),
		onSuccess: (data) => {
			noticeToastSvc.success("Вы успешно вошли в систему");
			useAuthStore.getState().setAccessToken(data.accessToken);
			useAuthStore.getState().setUser(data.user);
		},
		onError: () => {
			noticeToastSvc.success("Вы успешно вошли в систему");
		},
	});

	return {
		LoginLocal: mutation.mutateAsync,
		errorLogin: mutation.error,
		isLoginError: mutation.isError,
		isLoginPending: mutation.isPending,
		isLoginSuccess: mutation.isSuccess,
	};
};
