import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { LoginForm } from "../features/LoginForm.feature";

export const LoginWidget: React.FC = () => {
	return (
		<div className="flex flex-col gap-4">
			<ThemeSwitcher />
			<LoginForm />
		</div>
	);
};
