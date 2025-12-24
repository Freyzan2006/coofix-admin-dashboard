import environmentConfig from "@shared/config/environment.config";
import { type PropsWithChildren, StrictMode } from "react";

export const ModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const mode = environmentConfig.get<"dev" | "prod">("MODE");

	if (mode === "prod") {
		return <>{children}</>;
	}

	return <StrictMode>{children}</StrictMode>;
};
