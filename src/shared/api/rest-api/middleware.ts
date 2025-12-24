import { authApi, useAuthStore } from "@modules/auth";
import type { AxiosInstance } from "axios";

async function authRequestMiddleware(client: AxiosInstance) {
	client.interceptors.request.use((config) => {
		const token = useAuthStore.getState().accessToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	});
}

async function authResponseMiddleware(client: AxiosInstance) {
	let isRefreshing = false;

	client.interceptors.response.use(
		(res) => res,
		async (error) => {
			if (error.response?.status !== 401) {
				return Promise.reject(error);
			}

			const originalRequest = error.config;

			if (isRefreshing) {
				return client(originalRequest);
			}

			isRefreshing = true;

			try {
				const oldRefreshToken = useAuthStore.getState().refreshToken;

				if (!oldRefreshToken) {
					return Promise.reject(error);
				}
				const newAccessToken = await authApi.refresh(oldRefreshToken);

				useAuthStore.getState().setAccessToken(newAccessToken.accessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				return client(originalRequest);
			} catch (e) {
				useAuthStore.getState().setAccessToken(null);
				return Promise.reject(e);
			} finally {
				isRefreshing = false;
			}
		},
	);
}

export { authRequestMiddleware, authResponseMiddleware };
