import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "system",
	setTheme: () => {},
	resolvedTheme: "light",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	const [theme, setThemeState] = useState<Theme>("system");
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		setMounted(true);

		const saved = localStorage.getItem("theme") as Theme | null;
		if (saved) {
			setThemeState(saved);
		}

		const applyTheme = (themeToApply: Theme) => {
			const systemDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			const systemTheme = systemDark ? "dark" : "light";
			const finalTheme = themeToApply === "system" ? systemTheme : themeToApply;

			
			document.documentElement.setAttribute("data-theme", finalTheme);
			setResolvedTheme(finalTheme);

		
			if (finalTheme === "dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		};

		applyTheme(saved || "system");

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (theme === "system") {
				applyTheme("system");
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		localStorage.setItem("theme", newTheme);

		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const systemTheme = systemDark ? "dark" : "light";
		const finalTheme = newTheme === "system" ? systemTheme : newTheme;

		document.documentElement.setAttribute("data-theme", finalTheme);
		setResolvedTheme(finalTheme);
	};

	if (!mounted) {
		return <>{children}</>;
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		console.warn(
			"useTheme вызван вне ThemeProvider. Возвращаются значения по умолчанию.",
		);
		return {
			theme: "system" as Theme,
			setTheme: () => console.warn("ThemeProvider не найден"),
			resolvedTheme: "light" as const,
		};
	}

	return context;
};
