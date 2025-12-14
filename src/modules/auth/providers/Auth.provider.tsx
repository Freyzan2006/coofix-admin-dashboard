import { useEffect, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const currentPath = useLocation();
	const nav = useNavigate();

	const isAuth = false;

	useEffect(() => {
		if (isAuth && currentPath.pathname === "/") {
			nav("/dashboard");
		}

		if (isAuth && currentPath.pathname === "/auth/login") {
			nav("/dashboard");
		}

		if (!isAuth && currentPath.pathname !== "/auth/login") {
			nav("/auth/login");
		}
	}, [currentPath.pathname, nav]);

	return <>{children}</>;
};
