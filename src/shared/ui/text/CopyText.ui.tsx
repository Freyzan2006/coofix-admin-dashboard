import { cn } from "@shared/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ICopyTextProps extends React.HTMLAttributes<HTMLPreElement> {
	text: string;
	size?: "sm" | "md" | "lg";
	slice?: number;
}

export const CopyText: React.FC<ICopyTextProps> = ({
	text = "",
	size = "sm",
	slice = 0,
	...props
}) => {
	const [copied, setCopied] = useState(false);

	const handlerCopy = async () => {
		await navigator.clipboard.writeText(text);

		setCopied(true);
		setTimeout(() => setCopied(false), 300);
	};

	const sizeClasses = {
		sm: "text-sm",
		md: "text-md",
		lg: "text-lg",
	};

	const className = cn(props.className, sizeClasses[size]);
	const preparedText = slice > 0 ? text.slice(0, slice) : text;

	return (
		<pre className="flex items-center gap-2" {...props}>
			{copied ? (
				<Check className="text-green-500" size={17} />
			) : (
				<Copy
					className="cursor-pointer text-gray-500"
					onClick={handlerCopy}
					size={17}
				/>
			)}

			<code className={className}>
				{preparedText}
				{slice > 0 && text.length > slice && "..."}
			</code>
		</pre>
	);
};
