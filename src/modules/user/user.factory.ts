import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { type IUserApi, UserRestApi } from "./user.api";

async function factoryUserApi(): Promise<IUserApi> {
	const client = await newRestApiCli(
		environmentConfig.get<string>("VITE_API_URL"),
	);
	const api = new UserRestApi(client);
	return api;
}

export const userApi = await factoryUserApi();
