import { Spinner } from "@shared/ui/Spinner.ui";
import { type PropsWithChildren, useEffect } from "react";
import { authApi } from "../di/auth.di";

import { useAuthStore } from "../store/auth.store";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const setAccessToken = useAuthStore((s) => s.setAccessToken);
	const setAuthInitialized = useAuthStore((s) => s.setAuthInitialized);
	const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);

	useEffect(() => {
		(async () => {
			try {
				const res = await authApi.refresh();
				setAccessToken(res.accessToken);
			} catch {
				setAccessToken(null);
			} finally {
				setAuthInitialized(true);
			}
		})();
	}, [setAccessToken, setAuthInitialized]);

	if (!isAuthInitialized) return <Spinner />;

	return <>{children}</>;
};
