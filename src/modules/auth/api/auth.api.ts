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
}

class AuthRestApi implements IAuthApi {
	private readonly client: AxiosInstance;
	constructor(client: AxiosInstance) {
		this.client = client;
	}

	public async loginLocal(
		dto: LoginLocalDtoRequest,
	): Promise<LoginLocalDtoResponse> {
		return this.client.post("/auth/login", dto);
	}

	public async loginGoogle(
		dto: LoginGoogleDtoRequest,
	): Promise<LoginGoogleDtoResponse> {
		return this.client.post("/auth/google", dto);
	}
}

export { AuthRestApi };
