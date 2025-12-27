import type { AxiosInstance } from "axios";
import { authApi } from "../di/auth.di";
import { useAuthStore } from "../store/auth.store";

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
			const originalRequest = error.config;

			if (originalRequest?.url?.includes("/auth/refresh")) {
				return Promise.reject(error);
			}

			if (error.response?.status !== 401) {
				return Promise.reject(error);
			}

			if (isRefreshing) {
				return client(originalRequest);
			}

			isRefreshing = true;

			try {
				const res = await authApi.refresh();

				useAuthStore.getState().setAccessToken(res.accessToken);

				originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;

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
