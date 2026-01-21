import { Space } from "@shared/ui/Space.ui";
import { AuthActions } from "../features/AuthActions.feature";
import { Logout } from "../features/Logout.feature";

export const AuthControl: React.FC = () => {
	return (
		<Space gap={4} justify="center" align="center">
			<AuthActions />
			<Logout />
		</Space>
	);
};
