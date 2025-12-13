import { Paragraph } from "./Paragraph.ui";

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
		<Paragraph {...props}>
			{text.slice(0, slice)}
			{text.length > slice && "..."}
		</Paragraph>
	);
};
