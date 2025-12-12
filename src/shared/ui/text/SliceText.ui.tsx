interface ISliceTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	slice?: number;
	text: string;
}

export const SliceText: React.FC<ISliceTextProps> = ({
	slice = 3,
	text = "",
	...props
}) => {
	return (
		<p {...props}>
			{text.slice(0, slice)}
			{text.length > slice && "..."}
		</p>
	);
};
