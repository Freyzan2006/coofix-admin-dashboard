import { Navigate } from "react-router";
import { useAuthStore } from "@modules/auth";
import { Spinner } from "@shared/ui/Spinner.ui";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const isAuth = useAuthStore((s) => s.isAuth);
	const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);

	console.log("isAuth", isAuth);

	if (!isAuthInitialized) return <Spinner />; // пока bootstrapAuth не завершён

	if (!isAuth) return <Navigate to="/auth/login" replace />; // редирект на login

	return <>{children}</>;
};
