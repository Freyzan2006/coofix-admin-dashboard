import { useTheme } from "@app/providers/ThemeProvider";
import { cn } from "@shared/lib/utils";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const themes = [
		{ value: "light", icon: Sun, label: "Светлая" },
		{ value: "dark", icon: Moon, label: "Тёмная" },
		{ value: "system", icon: Monitor, label: "Системная" },
	] as const;

	return (
		<div className="flex gap-1 p-1 bg-base-200 rounded-lg">
			{themes.map(({ value, icon: Icon, label }) => (
				<button
					type="button"
					key={value}
					onClick={() => setTheme(value)}
					className={cn(
						"flex items-center gap-2 px-3 py-2 rounded-md transition-all",
						theme === value ? "bg-base-100 shadow-sm" : "hover:bg-base-300",
					)}
					title={label}
				>
					<Icon className="h-4 w-4" />
					<span className="hidden sm:inline">{label}</span>
				</button>
			))}
		</div>
	);
}
