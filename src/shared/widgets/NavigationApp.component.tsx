"use client";

import { AuthControl } from "@modules/auth";
import { Logo } from "@modules/common";

import { ThemeSwitcher } from "@shared/features/ThemeSwitcher";
import { cn } from "@shared/lib/utils";
import { Heading } from "@shared/ui/text";
import { TableOfContents } from "lucide-react";
import React from "react";
import { NavLink, useLocation } from "react-router";

export const NavigationApp: React.FC = React.memo(() => {
	const currentPath = useLocation().pathname;
	const pageTitle =
		currentPath === "/" ? "Главная" : currentPath.slice(1).replace("/", " / ");

	return (
		<nav
			className={cn(
				"navbar  w-full transition-all duration-300",
				"bg-base-100/90 backdrop-blur-md",
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
						<NavLink
							to="/dashboard/analytics"
							className="flex items-center gap-2 hover:opacity-80 transition-opacity"
						>
							<Logo />
							<Heading
								variant="primary"
								className="text-xl font-bold tracking-tight hidden sm:block"
							>
								Admin Panel
							</Heading>
						</NavLink>

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
});
