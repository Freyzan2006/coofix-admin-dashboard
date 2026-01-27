import type { RestApiCliType } from "@shared/api/rest-api/client";
import type { ProfileDtoResponse } from "./user.dto";

export interface IUserApi {
	profile(): Promise<ProfileDtoResponse>;
}

export class UserRestApi implements IUserApi {
	constructor(private readonly client: RestApiCliType) {}

	public async profile(): Promise<ProfileDtoResponse> {
		const response =
			await this.client.get<ProfileDtoResponse>("/users/profile");
		return response.data;
	}
}
