import { CarouselImg } from "@shared/ui/carousel";
import { Space } from "@shared/ui/Space.ui";
import { CopyText, Heading } from "@shared/ui/text";
import type { ProductModel } from "../../../model/product.model";
import { buildProductDetails } from "../data";
import { DetailRow } from "./DetailRow.ui";

interface IDetailsProductProps {
	product: ProductModel;
}

export const DetailsProduct: React.FC<IDetailsProductProps> = ({ product }) => {
	const details = buildProductDetails(product);

	return (
		<Space axis="vertical" align="start" gap={4}>
			<Heading variant="secondary">Подробная информация:</Heading>

			<CarouselImg images={product.images} />

			<Space axis="vertical" gap={2} fullWidth>
				{details.map(({ label, value }) => (
					<DetailRow key={label} label={label} value={value} />
				))}
			</Space>

			<Space axis="vertical" fullWidth>
				<Heading variant="primary">Характеристики:</Heading>

				<Space axis="vertical" gap={1}>
					{Object.entries(product.characteristics).map(([key, value]) => (
						<DetailRow
							key={key}
							label={key}
							value={<CopyText text={String(value)} />}
						/>
					))}
				</Space>
			</Space>
		</Space>
	);
};
