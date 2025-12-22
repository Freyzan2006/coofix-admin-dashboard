import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { LoginForm } from "../features/LoginForm.feature";
import { Space } from "@shared/ui/Space.ui";

export const LoginWidget: React.FC = () => {
	return (
		<Space axis="vertical" gap={4}>
			<ThemeSwitcher />
			<LoginForm />
		</Space>
	);
};
