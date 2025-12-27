import { Button } from "@shared/ui/Button.ui";
import { authApi } from "../di/auth.di";
import { useAuthStore } from "../store/auth.store";

export const Logout: React.FC = () => {
	const handlerLogout = async () => {
		await authApi.logout();
		useAuthStore.getState().setAccessToken(null);
	};

	return <Button onClick={handlerLogout}>Logout</Button>;
};
