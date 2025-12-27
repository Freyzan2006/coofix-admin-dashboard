import { authRequestMiddleware, authResponseMiddleware } from "@modules/auth";
import type { AxiosInstance } from "axios";

async function RequestInterceptor(client: AxiosInstance) {
	await authRequestMiddleware(client);
}

async function ResponseInterceptor(client: AxiosInstance) {
	await authResponseMiddleware(client);
}

export { RequestInterceptor, ResponseInterceptor };
