// @shared/ui/fields/select.tsx

import { cn } from "@shared/lib/utils";
import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

export interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
	label?: string;
	placeholder?: string;
	error?: string | boolean;
	size?: "xs" | "sm" | "md" | "lg";
	variant?: "default" | "bordered" | "ghost" | "filled";
	className?: string;
	labelClassName?: string;
	containerClassName?: string;
	required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			label,
			placeholder,
			error,
			size = "md",
			variant = "default",
			className,
			labelClassName,
			containerClassName,
			required,
			disabled,
			children,
			...props
		},
		ref,
	) => {
		const selectClasses = cn(
			"select w-full",
			{
				"select-xs": size === "xs",
				"select-sm": size === "sm",
				"select-md": size === "md",
				"select-lg": size === "lg",
			},
			{
				"select-bordered": variant === "bordered" || variant === "default",
				"select-ghost": variant === "ghost",
				"bg-base-200": variant === "filled",
				"select-error": !!error,
				"opacity-60 cursor-not-allowed": disabled,
			},
			className,
		);

		return (
			<div className={cn("form-control w-full", containerClassName)}>
				{label && (
					<label className={cn("label", labelClassName)}>
						<span className="label-text">
							{label}
							{required && <span className="text-error ml-1">*</span>}
						</span>
					</label>
				)}

				<select
					ref={ref}
					className={selectClasses}
					disabled={disabled}
					{...props}
				>
					{placeholder && (
						<option value="" disabled selected>
							{placeholder}
						</option>
					)}
					{children}
				</select>

				{error && typeof error === "string" && (
					<label className="label">
						<span className="label-text-alt text-error">{error}</span>
					</label>
				)}
			</div>
		);
	},
);

Select.displayName = "Select";

// Удобные алиасы для использования в проекте
// export const SelectTrigger = Select; // просто для совместимости с привычным API

// export function SelectValue({ children }: { children: ReactNode }) {
// 	return <>{children}</>; // в daisyUI это просто текст внутри <option>
// }

export function SelectItem({
	value,
	children,
	disabled,
}: {
	value: string;
	children: ReactNode;
	disabled?: boolean;
}) {
	return (
		<option value={value} disabled={disabled}>
			{children}
		</option>
	);
}
