// import { AuthControl } from "@modules/auth";
// import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
// import { Space } from "@shared/ui/Space.ui";
// import { Heading } from "@shared/ui/text";
// import { TableOfContents } from "lucide-react";

// export const NavigationApp: React.FC = () => {
// 	const urlPage = window.location.pathname;

// 	return (
// 		<nav className="navbar w-full bg-base-300">
// 			<label
// 				htmlFor="my-drawer-4"
// 				aria-label="open sidebar"
// 				className="btn btn-square btn-ghost"
// 			>
// 				<TableOfContents />
// 			</label>
// 			<div className="px-4 flex w-full items-center justify-between">
// 				<Heading variant="primary">{urlPage}</Heading>
// 				<Space align="center">
// 					<ThemeSwitcher variant="secondary" />
// 					<AuthControl />
// 				</Space>
// 			</div>
// 		</nav>
// 	);
// };

"use client";

import { AuthControl } from "@modules/auth";

import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { cn } from "@shared/lib/utils";
import { Heading } from "@shared/ui/text";
import { Home, TableOfContents } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const NavigationApp: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	// Эффект тени при скролле
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Текущий путь (можно улучшить: взять название страницы из роутера или конфига)
	// const currentPath = window.location.pathname;
	const currentPath = useLocation().pathname;
	const pageTitle =
		currentPath === "/" ? "Главная" : currentPath.slice(1).replace("/", " / ");

	console.log(currentPath);

	return (
		<nav
			className={cn(
				"navbar sticky top-0 z-50 w-full transition-all duration-300 h-full",
				"bg-base-100/90 backdrop-blur-md",
				isScrolled
					? "shadow-sm border-b border-base-200"
					: "shadow-none border-b border-transparent",
				"px-4 md:px-6",
			)}
		>
			<div className="flex w-full items-center justify-between gap-4">
				{/* Левая часть: меню + заголовок */}
				<div className="flex items-center gap-3 md:gap-6">
					{/* Кнопка открытия бокового меню */}
					<label
						htmlFor="my-drawer-4"
						aria-label="Открыть боковое меню"
						className="btn btn-ghost btn-square lg:hidden"
					>
						<TableOfContents className="h-5 w-5" />
					</label>

					{/* Логотип / название */}
					<div className="flex items-center gap-2">
						<a
							href="/"
							className="flex items-center gap-2 hover:opacity-80 transition-opacity"
						>
							<Home className="h-5 w-5 text-primary" />
							<Heading
								variant="primary"
								className="text-xl font-bold tracking-tight hidden sm:block"
							>
								Admin Panel
							</Heading>
						</a>

						{/* Текущая страница */}
						<div className="hidden md:flex items-center gap-2 opacity-70">
							<span className="text-base-content/60">/</span>
							<span className="text-sm font-medium capitalize">
								{pageTitle}
							</span>
						</div>
					</div>
				</div>

				{/* Правая часть: переключатель темы + авторизация */}
				<div className="flex items-center gap-2 md:gap-4">
					<ThemeSwitcher variant="secondary" />
					<AuthControl />
				</div>
			</div>
		</nav>
	);
};
