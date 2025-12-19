import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { authApi } from "../di/auth.di";
import type { LoginLocalDtoRequest } from "../api/dto/login.dto";

export const useLoginLocal = () => {
	const mutation = useMutation({
		mutationFn: (data: LoginLocalDtoRequest) => authApi.loginLocal(data),
		onSuccess: (data) => {
			useAuthStore.getState().setAccessToken(data.accessToken);
			useAuthStore.getState().setRefreshToken(data.refreshToken);
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
