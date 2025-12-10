import type { UserEntity } from "@modules/user/entities/user.entity";

export interface LoginLocalDtoRequest {
	email: string;
	password: string;
}

export interface LoginLocalDtoResponse {
	success: boolean;
	user: UserEntity;
	accessToken: string;
	refreshToken: string;
	token: string;
}

export interface LoginGoogleDtoRequest {
	idToken: string;
}

export interface LoginGoogleDtoResponse {
	success: boolean;
	token: string;
	user: UserEntity;
}
