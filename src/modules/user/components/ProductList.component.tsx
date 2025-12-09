import { useTheme } from "@app/providers/ThemeProvider";
import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { Button } from "@shared/ui/Button.ui";

export const ProductList: React.FC = () => {
	const { resolvedTheme } = useTheme();

	console.log(resolvedTheme);

	return (
		<>
			<Button variant="primary">Dark/Light</Button>
			<ThemeSwitcher />
		</>
	);
};
