import { cn } from "@shared/lib/utils";

interface ISpaceProps extends React.HTMLAttributes<HTMLDivElement> {
	axis?: "vertical" | "horizontal";
	gap?: number;
	justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
	align?: "start" | "center" | "end" | "stretch" | "baseline";
	fullYScreen?: boolean;
	fullXScreen?: boolean;
}

export const Space: React.FC<ISpaceProps> = ({
	axis = "horizontal",
	gap = 4,
	children,
	justify = "start",
	align = "stretch",
	fullYScreen = false,
	fullXScreen = false,
	...props
}) => {
	const baseClass = "flex";

	const justifyMap: Record<string, string> = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
		around: "justify-around",
		evenly: "justify-evenly",
	} as const;

	const alignMap: Record<string, string> = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
		stretch: "items-stretch",
		baseline: "items-baseline",
	} as const;

	const className = cn(
		baseClass,
		props.className,
		axis === "vertical" ? "flex-col" : "flex-row",
		justify ? justifyMap[justify] : "",
		align ? alignMap[align] : "",
		`gap-${gap}`,
		fullYScreen ? "h-screen" : "",
		fullXScreen ? "w-screen" : "",
	);

	return (
		<div {...props} className={className}>
			{children}
		</div>
	);
};
