import { Button } from "@shared/ui/Button.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { LogOutIcon } from "lucide-react";
import { useLogout } from "../adapters/logout.hook";

export const Logout: React.FC = () => {
	const { logoutAsync, isPendingLogout } = useLogout();

	const handlerLogout = async () => await logoutAsync();

	return (
		<Button size="sm" onClick={handlerLogout} disabled={isPendingLogout}>
			{!isPendingLogout ? <LogOutIcon /> : <Loading />} Выйти
		</Button>
	);
};
