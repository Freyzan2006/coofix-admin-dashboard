import type { UserModel } from "@modules/user";

export interface LoginLocalDtoRequest {
	email: string;
	password: string;
}

export interface LoginLocalDtoResponse {
	success: boolean;
	user: UserModel;
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
	user: UserModel;
}

export interface RefreshTokenDtoResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}
