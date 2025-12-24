import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { Space } from "@shared/ui/Space.ui";
import { LoginForm } from "../features/LoginForm.feature";

export const LoginWidget: React.FC = () => {
	return (
		<Space axis="vertical" gap={4}>
			<ThemeSwitcher />
			<LoginForm />
		</Space>
	);
};
