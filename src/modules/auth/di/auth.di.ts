import { newRestApiCli } from "@shared/api/rest-api/client";
import { environmentConfig } from "@shared/config";
import { AuthRestApi } from "../auth.api";

const clientRestApi = await newRestApiCli(
	environmentConfig.get<string>("VITE_API_URL"),
);

export const authApi = new AuthRestApi(clientRestApi);
