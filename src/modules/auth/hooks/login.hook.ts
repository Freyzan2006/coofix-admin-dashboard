import { useMutation } from "@tanstack/react-query";
import { authApi } from "../di/auth.di";
import type {
	LoginLocalDtoRequest,
	LoginLocalDtoResponse,
} from "../api/dto/login.dto";
import type { ApiAxiosError } from "@shared/api/rest-api/types";

export const useLoginLocal = () => {
	const { mutateAsync, isError, isSuccess, isPending, error } = useMutation<
		LoginLocalDtoResponse,
		ApiAxiosError,
		LoginLocalDtoRequest
	>({
		mutationFn: (data: LoginLocalDtoRequest) => authApi.loginLocal(data),
		onSuccess: (data) => {
			console.log("Успешный вход:", data);
		},
		onError: (error: ApiAxiosError) => {
			console.error("Ошибка входа:", error);
		},
	});

	return {
		LoginLocal: mutateAsync,
		isLoginError: isError,
		isLoginSuccess: isSuccess,
		isLoginPending: isPending,
		errorLogin: error,
	};
};
