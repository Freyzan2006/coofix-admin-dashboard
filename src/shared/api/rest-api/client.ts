// shared/api/newRestApiCli.ts
import axios, { type AxiosInstance } from "axios";
import { RequestInterceptor, ResponseInterceptor } from "./middleware";

export async function newRestApiCli(
	baseURL: string = "https://coofix-server.onrender.com/api",
	timeout: number = 60000,
	headers: Record<string, string> = {
		"Content-Type": "application/json",
	},
): Promise<RestApiCliType> {
	const client = axios.create({
		baseURL,
		withCredentials: true,
		timeout,
		headers,
	});

	await RequestInterceptor(client);
	await ResponseInterceptor(client);

	return client;
}

export type RestApiCliType = AxiosInstance;
