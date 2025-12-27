import { Space } from "@shared/ui/Space.ui";
import { Paragraph } from "@shared/ui/text";

interface DetailRowProps {
	label: string;
	value: React.ReactNode;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
	<Space>
		<Paragraph variant="secondary" className="min-w-[160px]">
			{label}
		</Paragraph>
		{value}
	</Space>
);
