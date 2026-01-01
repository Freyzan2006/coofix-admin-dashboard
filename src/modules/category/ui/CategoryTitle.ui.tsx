import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { ChartBarStackedIcon } from "lucide-react";

export const CategoryTitle: React.FC = () => {
	return (
		<Space gap={3} fullWidth axis="horizontal" align="center">
			<ChartBarStackedIcon />
			<Heading variant="default">Категории продукта</Heading>
		</Space>
	);
};
