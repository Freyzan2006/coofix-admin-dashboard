import {
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTitle,
} from "@shared/ui/dropdown";
import { UserIcon } from "lucide-react";
import { useAuthStore } from "../store/auth.store";

export const AuthActions: React.FC = () => {
	const { user } = useAuthStore();

	return (
		<Dropdown>
			<DropdownTitle>
				<UserIcon /> {user?.email}
			</DropdownTitle>
			<DropdownContent>
				<DropdownItem>Выйти</DropdownItem>
			</DropdownContent>
		</Dropdown>
	);
};
