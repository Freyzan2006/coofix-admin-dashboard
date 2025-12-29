import { cn } from "@shared/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { Suspense } from "react";
import { Loading } from "../Loading.ui";

export type TabItem = {
	id: string;
	label: string;
	content: React.ReactNode;
	disabled?: boolean;
	icon?: React.ReactNode;
};

export interface TabsProps {
	items: TabItem[];
	activeTab: string;
	onChange: (tabId: string) => void;
	variant?: "bordered" | "lifted" | "boxed";
	size?: "xs" | "sm" | "md" | "lg";
	position?: "top" | "bottom" | "left" | "right";
	animated?: boolean;
	className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
	items,
	activeTab,
	onChange,
	variant = "bordered",
	size = "md",
	position = "top",
	animated = true,
	className,
}) => {
	const activeTabItem = items.find((item) => item.id === activeTab);

	const tabsContainerClasses = cn(
		"tabs",
		{
			"tabs-bordered": variant === "bordered",
			"tabs-lifted": variant === "lifted",
			"tabs-boxed": variant === "boxed",
			"tabs-xs": size === "xs",
			"tabs-sm": size === "sm",
			"tabs-md": size === "md",
			"tabs-lg": size === "lg",
		},
		className,
	);

	const isVertical = position === "left" || position === "right";
	const flexDirection = isVertical ? "flex-col" : "flex-row";
	const tabListPosition = isVertical ? "items-start" : "items-center";

	return (
		<div className={cn("flex", isVertical ? "flex-row" : "flex-col", "gap-4")}>
			<div
				role="tablist"
				className={cn(tabsContainerClasses, flexDirection, tabListPosition)}
			>
				{items.map((item) => (
					<button
						key={item.id}
						type="button"
						role="tab"
						className={cn(
							"tab",
							"flex items-center gap-2",
							"transition-all duration-200",
							activeTab === item.id && "tab-active",
							item.disabled && "tab-disabled",
						)}
						onClick={() => !item.disabled && onChange(item.id)}
						disabled={item.disabled}
						aria-selected={activeTab === item.id}
					>
						{item.icon && <span className="flex-shrink-0">{item.icon}</span>}
						{item.label}
					</button>
				))}
			</div>

			<div className="flex-1">
				{animated ? (
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
						>
							<Suspense fallback={<Loading />}>
								{activeTabItem?.content}
							</Suspense>
						</motion.div>
					</AnimatePresence>
				) : (
					<Suspense fallback={<Loading />}>{activeTabItem?.content}</Suspense>
				)}
			</div>
		</div>
	);
};
