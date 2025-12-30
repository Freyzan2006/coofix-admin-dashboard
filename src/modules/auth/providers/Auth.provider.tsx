import { type PropsWithChildren, useEffect } from "react";
import { authApi } from "../di/auth.di";

import { useAuthStore } from "../store/auth.store";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";

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

	if (!isAuthInitialized) return <Space align="center" justify="center" fullYScreen><Loading size="xl" /></Space>;

	return <>{children}</>;
};
