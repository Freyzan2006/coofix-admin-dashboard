import type { AxiosInstance } from "axios";
import type {
	LoginGoogleDtoRequest,
	LoginGoogleDtoResponse,
	LoginLocalDtoRequest,
	LoginLocalDtoResponse,
} from "./dto/login.dto";

interface IAuthApi {
	loginLocal(dto: LoginLocalDtoRequest): Promise<LoginLocalDtoResponse>;
	loginGoogle(dto: LoginGoogleDtoRequest): Promise<LoginGoogleDtoResponse>;
	refresh(): Promise<{ success: boolean; accessToken: string; refreshToken: string }>;
}

class AuthRestApi implements IAuthApi {
	private readonly client: AxiosInstance;
	constructor(client: AxiosInstance) {
		this.client = client;
	}

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

	public async refresh(): Promise<{ success: boolean; accessToken: string; refreshToken: string }> {
		const res = await this.client.post("/auth/refresh");
		return res.data;
	}

	public async logout() {
		await this.client.post("/auth/logout");
	}
}

export { AuthRestApi };
