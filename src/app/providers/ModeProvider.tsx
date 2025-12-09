import environmentConfig from "@shared/config/environment.config";
import { StrictMode, type PropsWithChildren } from "react";

export const ModeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const mode = environmentConfig.get<boolean>("MODE");
	console.log(typeof mode);

	return <StrictMode>{children}</StrictMode>;
};
