import { cn } from "@shared/lib/utils";

export const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
	...props
}) => {
	const baseClass = "object-cover";

	const className = cn(baseClass, props.className);

	return (
		<img
			className={className}
			src={props.src}
			alt={props.alt}
			loading="lazy"
			decoding="async"
			referrerPolicy="no-referrer"
			{...props}
		/>
	);
};
