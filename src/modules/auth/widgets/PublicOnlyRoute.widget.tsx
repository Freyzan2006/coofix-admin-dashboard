import { useAuthStore } from "@modules/auth";
import { Spinner } from "@shared/ui/Spinner.ui";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

const AUTH_REDIRECT = "/dashboard";

export const PublicOnlyRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);

  if (!isAuthInitialized) {
    return <Spinner />;
  }

  if (accessToken) {
    return <Navigate to={AUTH_REDIRECT} replace />;
  }

  return <>{children}</>;
};
