import axios from "axios";

export function newRestApiCli(
	baseURL: string = "https://coofix-server.onrender.com/api",
	timeout: number = 25000,
	headers: Record<string, string> = {
		"Content-Type": "application/json",
	},
) {
	return axios.create({
		baseURL,
		timeout,
		headers,
	});
}
