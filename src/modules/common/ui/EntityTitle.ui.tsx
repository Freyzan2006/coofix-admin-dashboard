import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { ChartBarStackedIcon } from "lucide-react";

interface IEntityTitleProps {
	title: string;
}

export const EntityTitle: React.FC<IEntityTitleProps> = ({ title }) => {
	return (
		<Space gap={3} fullWidth axis="horizontal" align="center">
			<ChartBarStackedIcon />
			<Heading variant="default">{title}</Heading>
		</Space>
	);
};
