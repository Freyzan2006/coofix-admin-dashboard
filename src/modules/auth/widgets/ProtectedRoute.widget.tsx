import { useAuthStore } from "@modules/auth";
import { Spinner } from "@shared/ui/Spinner.ui";
import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const accessToken = useAuthStore((s) => s.accessToken);
	const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);
	const location = useLocation();

	if (!isAuthInitialized) {
		return <Spinner />;
	}

	if (!accessToken) {
		return (
			<Navigate to="/auth/login" replace state={{ from: location.pathname }} />
		);
	}

	return <>{children}</>;
};
