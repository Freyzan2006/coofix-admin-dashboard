import type { RestApiCliType } from "@shared/api/rest-api/client";
import type {
	LoginGoogleDtoRequest,
	LoginGoogleDtoResponse,
	LoginLocalDtoRequest,
	LoginLocalDtoResponse,
} from "./dto/login.dto";

interface IAuthApi {
	loginLocal(dto: LoginLocalDtoRequest): Promise<LoginLocalDtoResponse>;
	loginGoogle(dto: LoginGoogleDtoRequest): Promise<LoginGoogleDtoResponse>;
	refresh(): Promise<{
		success: boolean;
		accessToken: string;
		refreshToken: string;
	}>;
}

class AuthRestApi implements IAuthApi {
	constructor(private readonly client: RestApiCliType) {}

	public async loginLocal(
		dto: LoginLocalDtoRequest,
	): Promise<LoginLocalDtoResponse> {
		const res = await this.client.post("/auth/login", dto);
		return res.data;
	}

	public async loginGoogle(
		dto: LoginGoogleDtoRequest,
	): Promise<LoginGoogleDtoResponse> {
		return this.client.post("/auth/google", dto);
	}

	public async refresh(): Promise<{
		success: boolean;
		accessToken: string;
		refreshToken: string;
	}> {
		const res = await this.client.post("/auth/refresh");
		return res.data;
	}

	public async logout() {
		await this.client.post("/auth/logout");
	}
}

export { AuthRestApi };
