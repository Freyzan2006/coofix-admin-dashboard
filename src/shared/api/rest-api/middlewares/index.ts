import { authRequestMiddleware, authResponseMiddleware } from "@modules/auth";
import type { AxiosInstance } from "axios";
import { multipartRequestMiddleware } from "./multipart.middleware";

async function RequestInterceptor(client: AxiosInstance) {
	await multipartRequestMiddleware(client);
	await authRequestMiddleware(client);
}

async function ResponseInterceptor(client: AxiosInstance) {
	await authResponseMiddleware(client);
}

export { RequestInterceptor, ResponseInterceptor };
