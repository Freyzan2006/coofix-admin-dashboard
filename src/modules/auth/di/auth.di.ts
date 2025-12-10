import { newRestApiCli } from "@shared/api";
import { environmentConfig } from "@shared/config";
import { AuthRestApi } from "../api/auth.api";

const clientRestApi = newRestApiCli(
	environmentConfig.get<string>("VITE_API_URL"),
);
export const authApi = new AuthRestApi(clientRestApi);
