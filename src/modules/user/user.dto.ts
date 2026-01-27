import type { UserModel } from "./user.model";

export interface ProfileDtoResponse {
	success: boolean;
	user: UserModel;
}
