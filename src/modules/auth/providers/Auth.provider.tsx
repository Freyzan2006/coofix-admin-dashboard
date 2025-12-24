import { type PropsWithChildren, useEffect } from "react";
import { bootstrapAuth } from "../store/auth.bootstrap";
import { useAuthStore } from "../store/auth.store";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	useEffect(() => {
		(async () => {
			const store = useAuthStore.getState();

			if (store.accessToken) {
				store.setAuthInitialized(true);
				return;
			}

			const token = await bootstrapAuth();

			if (token) {
				store.setAccessToken(token);
			}

			store.setAuthInitialized(true);
		})();
	}, []);

	return <>{children}</>;
};
