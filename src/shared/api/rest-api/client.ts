// shared/api/newRestApiCli.ts
import axios, { type AxiosInstance } from "axios";
import { authRequestMiddleware, authResponseMiddleware } from "./middleware";

export async function newRestApiCli(
	baseURL: string = "https://coofix-server.onrender.com/api",
	timeout: number = 60000,
	headers: Record<string, string> = {
		"Content-Type": "application/json",
	},
): Promise<AxiosInstance> {
	const client = axios.create({
		baseURL,
		withCredentials: true,
		timeout,
		headers,
	});

	await authRequestMiddleware(client);
	await authResponseMiddleware(client);

	return client;
}
