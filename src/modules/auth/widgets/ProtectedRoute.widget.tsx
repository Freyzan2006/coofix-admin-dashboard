import { useAuthStore } from "@modules/auth";
import { Spinner } from "@shared/ui/Spinner.ui";
import { Navigate } from "react-router";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const isAuth = useAuthStore((s) => s.isAuth);
	const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);

	if (!isAuthInitialized) return <Spinner />;

	if (!isAuth) return <Navigate to="/auth/login" replace />;

	return <>{children}</>;
};
