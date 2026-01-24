import { useAuthStore } from "@modules/auth";
import { Loading } from "@shared/ui/Loading.ui";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { AUTH_REDIRECT } from "../auth.config";

export const PublicOnlyRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const accessToken = useAuthStore((s) => s.accessToken);
	const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);

	if (!isAuthInitialized) {
		return <Loading />;
	}

	if (accessToken) {
		return <Navigate to={AUTH_REDIRECT} replace />;
	}

	return <>{children}</>;
};
