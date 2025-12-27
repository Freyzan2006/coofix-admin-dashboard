import { useMutation } from "@tanstack/react-query";
import type { LoginLocalDtoRequest } from "../api/dto/login.dto";
import { authApi } from "../di/auth.di";
import { useAuthStore } from "../store/auth.store";

export const useLoginLocal = () => {
	const mutation = useMutation({
		mutationFn: (data: LoginLocalDtoRequest) => authApi.loginLocal(data),
		onSuccess: (data) => {
			useAuthStore.getState().setAccessToken(data.accessToken);
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
