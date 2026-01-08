import { useTheme } from "@app/providers/ThemeProvider";
import { noticeToastSvc } from "@modules/notification";
import { cn } from "@shared/lib/utils";

import { Monitor, Moon, Sun } from "lucide-react";

interface ThemeSwitcherProps {
	variant?: "primary" | "secondary";
	className?: string;
}

export function ThemeSwitcher({
	variant = "primary",
	className,
}: ThemeSwitcherProps) {
	const { theme, setTheme } = useTheme();

	const themes = [
		{ value: "light", icon: Sun, label: "Светлая" },
		{ value: "dark", icon: Moon, label: "Тёмная" },
		{ value: "system", icon: Monitor, label: "Системная" },
	] as const;

	if (variant === "primary") {
		return (
			<div className={cn("flex gap-1 p-1 bg-base-200 rounded-lg", className)}>
				{themes.map(({ value, icon: Icon, label }) => (
					<button
						type="button"
						key={value}
						onClick={() => setTheme(value)}
						className={cn(
							"flex items-center gap-2 px-3 py-2 rounded-md transition-all cursor-pointer",
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

	const currentTheme = themes.find((t) => t.value === theme) || themes[0];

	const handleClick = () => {
		const currentIndex = themes.findIndex((t) => t.value === theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex].value);
		noticeToastSvc.success(
			`Тема успешно изменена на ${themes[nextIndex].label}`,
		);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"cursor-pointer",
				"flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition-all",
				className,
			)}
			title={`Сменить тему на следующую (текущая: ${currentTheme.label})`}
		>
			<currentTheme.icon className="h-4 w-4" />
		</button>
	);
}
