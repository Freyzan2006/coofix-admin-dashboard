import type { CategoryModel } from "@modules/category/category.model";
import { DetailRow } from "@modules/common";
import { CarouselImg } from "@shared/ui/carousel";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { buildCategoryDetails } from "../data";

interface IDetailsProductProps {
	category: CategoryModel;
}

export const DetailsCategory: React.FC<IDetailsProductProps> = ({
	category,
}) => {
	const details = buildCategoryDetails(category);
	return (
		<Space axis="vertical" align="start" gap={4}>
			<Heading variant="secondary">Подробная информация:</Heading>

			<CarouselImg images={[category.image || ""]} />

			<Space axis="vertical" gap={2} fullWidth>
				{details.map(({ label, value }) => (
					<DetailRow key={label} label={label} value={value} />
				))}
			</Space>
		</Space>
	);
};
