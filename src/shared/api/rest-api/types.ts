import type { AxiosError } from "axios";

interface ApiError {
	success: boolean;
	message: string;
}

export type ApiAxiosError = AxiosError<ApiError>;
