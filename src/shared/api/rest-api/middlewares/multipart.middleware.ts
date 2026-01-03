// shared/api/middleware/multipart.middleware.ts
import type { AxiosInstance } from "axios";

export async function multipartRequestMiddleware(client: AxiosInstance) {
	client.interceptors.request.use((config) => {
		if (config.data instanceof FormData) {
			delete config.headers?.["Content-Type"];
			delete config.headers?.["content-type"];
		}
		return config;
	});
}
