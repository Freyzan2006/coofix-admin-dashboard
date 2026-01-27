import { useLogoutAdapter } from "@modules/auth";
import { Alert } from "@shared/ui/Alert.ui";
import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTitle,
} from "@shared/ui/dropdown";
import { Loading } from "@shared/ui/Loading.ui";
import { LogOutIcon, ShieldUserIcon, UserIcon } from "lucide-react";
import { useProfileAdapter } from "../adapters/use-profile.adapter";

export const UserControler: React.FC = () => {
	const { profile, isLoading, error, isError } = useProfileAdapter();

	const { logoutAsync, isPendingLogout } = useLogoutAdapter();

	const handlerLogout = async () => await logoutAsync();

	if (isError) return <Alert variant="danger">{error?.message}</Alert>;

	return (
		<Dropdown direction="bottom" className="w-full">
			<DropdownTitle>
				<UserIcon />{" "}
				{isLoading ? <Loading variant="secondary" /> : profile?.name}
			</DropdownTitle>
			<DropdownContent>
				<DropdownItem>
					<ShieldUserIcon /> Профиль
				</DropdownItem>
				<DropdownItem
					variant="button"
					onClick={handlerLogout}
					disabled={isPendingLogout}
				>
					{isPendingLogout ? <Loading variant="secondary" /> : <LogOutIcon />}{" "}
					Выйти
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	);
};
