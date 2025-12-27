import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	isAuth: boolean;
	isAuthInitialized: boolean;

	setAccessToken: (token: string | null) => void;
	setAuthInitialized: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	isAuth: false,
	isAuthInitialized: false,

	setAccessToken: (token) =>
		set({
			accessToken: token,
			isAuth: !!token,
		}),

	setAuthInitialized: (v) => set({ isAuthInitialized: v }),
}));
