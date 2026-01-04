import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { authApi } from "../di/auth.di";
import { toast } from "@shared/ui/toast";



export function useLogout() {
    const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
        mutationFn: async () => {
            await authApi.logout();
        },
        onSuccess: () => {
            useAuthStore.getState().setAccessToken(null);
            toast.success("Вы успешно вышли из системы");
        },
        onError: () => {
            toast.error("Произошла ошибка при выходе из системы");
        },
    });

    return {
        logout: mutate,
        logoutAsync: mutateAsync,
        isErrorLogout: isError,
        isPendingLogout: isPending,
        isSuccessLogout: isSuccess,
    }
}