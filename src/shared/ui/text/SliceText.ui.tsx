import { cn } from "@shared/lib/utils";

interface ISliceTextProps extends React.HTMLAttributes<HTMLPreElement> {
	text: string;
	size?: "sm" | "md" | "lg";
	slice?: number;
}

export const SliceText: React.FC<ISliceTextProps> = ({
	text = "",
	size = "sm",
	slice = 0,
	...props
}) => {
	const sizeClasses = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	};

	const className = cn(props.className, sizeClasses[size], "text-wrap");
	const preparedText = slice > 0 ? text.slice(0, slice) : text;

	return (
		<pre
			className="flex items-center justify-start gap-2"
			title={text}
			{...props}
		>
			<code className={className}>
				{preparedText}
				{slice > 0 && text.length > slice && "..."}
			</code>
		</pre>
	);
};
