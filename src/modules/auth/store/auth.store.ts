import type { UserModel } from "@modules/user";
import { create } from "zustand";

interface AuthState {
	accessToken: string | null;
	isAuth: boolean;
	isAuthInitialized: boolean;
	user: UserModel | null;

	setAccessToken: (token: string | null) => void;
	setAuthInitialized: (v: boolean) => void;
	setUser: (user: UserModel | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	accessToken: null,
	isAuth: false,
	isAuthInitialized: false,
	user: null,

	setUser: (user: UserModel | null) => set({ user }),

	setAccessToken: (token) =>
		set({
			accessToken: token,
			isAuth: !!token,
		}),

	setAuthInitialized: (v) => set({ isAuthInitialized: v }),
}));
