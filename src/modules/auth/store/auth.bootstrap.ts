import { authApi } from "../di/auth.di";
import { useAuthStore } from "./auth.store";

export const bootstrapAuth = async () => {
	try {
		const refreshToken = useAuthStore.getState().refreshToken;
		if (!refreshToken) {
			return;
		}
		const res = await authApi.refresh(refreshToken);
		useAuthStore.getState().setAccessToken(res.accessToken);
		return res.accessToken;
	} catch {
		useAuthStore.getState().setAccessToken(null);
	}
};
