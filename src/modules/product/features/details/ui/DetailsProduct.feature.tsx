import { useProductAdapter } from "@modules/product/adapters/useProduct.adapter";
import { productCharacteristicsMapper } from "@modules/product/di/product.di";
import { Alert } from "@shared/ui/Alert.ui";
import { CarouselImg } from "@shared/ui/carousel";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { CopyText, Heading } from "@shared/ui/text";
import { buildProductDetails } from "../data";
import { DetailRow } from "./DetailRow.ui";

interface IDetailsProductProps {
	slug: string;
}

export const DetailsProduct: React.FC<IDetailsProductProps> = ({ slug }) => {
	const { product, productIsLoading, productIsError } = useProductAdapter(slug);

	if (productIsLoading) {
		return (
			<Space gap={3} align="center" justify="center">
				<Loading />
			</Space>
		);
	}

	if (productIsError) {
		return (
			<Space gap={3} align="center" justify="center">
				<Alert variant="danger">
					Произошла ошибка при загрузке продукта. Попробуйте ещё раз потом
				</Alert>
			</Space>
		);
	}

	if (!product) {
		return (
			<Space gap={3} align="center" justify="center">
				<Alert variant="danger">
					Произошла ошибка при загрузке продукта. Попробуйте ещё раз потом
				</Alert>
			</Space>
		);
	}

	const details = buildProductDetails(product);

	const prepareData = productCharacteristicsMapper.toModel(
		product.characteristics || {},
	);

	return (
		<Space axis="vertical" align="start" gap={4}>
			<Heading variant="secondary">Подробная информация:</Heading>

			<CarouselImg images={product.images || []} />

			<Space axis="vertical" gap={2} fullWidth>
				{details.map(({ label, value }) => (
					<DetailRow key={label} label={label} value={value} />
				))}
			</Space>

			<Space axis="vertical" fullWidth>
				<Heading variant="primary">Характеристики:</Heading>

				<Space axis="vertical" gap={1}>
					{/* {Object.entries(product.characteristics || {}).map(([index, value]) => (
						<DetailRow
							key={index}
							label={String(value.name)}
							value={<CopyText text={String(value.value)} />}
						/>
					))} */}

					{prepareData.map(({ name, value }) => (
						<DetailRow
							key={name}
							label={String(name)}
							value={<CopyText text={String(value)} />}
						/>
					))}
				</Space>
			</Space>
		</Space>
	);
};
