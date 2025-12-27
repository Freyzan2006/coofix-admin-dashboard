// import { CopyText, Heading, Paragraph } from "@shared/ui/text";
// import type { ProductModel } from "../model/product.model";
// import { Space } from "@shared/ui/Space.ui";
// import { LinkApp } from "@shared/ui/Link.ui";
// import { CarouselImg } from "@shared/ui/carousel";

// interface IDetailsProductProps {
// 	product: ProductModel;
// }

// export const DetailsProduct: React.FC<IDetailsProductProps> = ({ product }) => {
// 	console.log("product", product);
// 	return (
// 		<Space axis="vertical" align="start">
// 			<Heading variant="secondary">Подробная информация</Heading>
// 			<CarouselImg images={product.images} />
// 			<Space>
// 				<Paragraph variant="secondary">ID:</Paragraph>
// 				<CopyText text={product._id} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Название:</Paragraph>
// 				<CopyText text={product.name} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Описание:</Paragraph>
// 				<CopyText text={product.description} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Цена:</Paragraph>
// 				<CopyText text={`${String(product.price)} $`} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Количество:</Paragraph>
// 				<CopyText text={`${String(product.quantity)} ш.т`} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Старая цена:</Paragraph>
// 				<CopyText text={`${String(product.oldPrice || "-")} $`} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Категория:</Paragraph>
// 				<LinkApp
// 					variant="success"
// 					to={`/dashboard/categories/`}
// 				>
// 					#{product.category.slug}
// 				</LinkApp>
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Бренд:</Paragraph>
// 				<LinkApp
// 					variant="success"
// 					to={`/dashboard/categories/`}
// 				>
// 					#{product.brand.slug}
// 				</LinkApp>
// 			</Space>
// 			<Space fullWidth>
// 				<Paragraph variant="secondary">Характеристики:</Paragraph>
// 				<Space axis="vertical">
// 					{Object.entries(product.characteristics).map(([key, value]) => (
// 						<Space key={key}>
// 							<Paragraph variant="primary">{key}:</Paragraph>
// 							<CopyText text={value} />
// 						</Space>
// 					))}
// 				</Space>
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">В наличии:</Paragraph>
// 				<CopyText text={product.inStock ? "Да" : "Нет"} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Новинка:</Paragraph>
// 				<CopyText text={product.isNew ? "Да" : "Нет"} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Распродажа:</Paragraph>
// 				<CopyText text={product.isSale ? "Да" : "Нет"} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Средняя оценка:</Paragraph>
// 				<CopyText text={`${String(product.ratingAvg)} / 5 ш.т`} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Количество отзывов:</Paragraph>
// 				<CopyText text={`${String(product.ratingCount)} ш.т`} />
// 			</Space>
// 			<Space>
// 				<Paragraph variant="secondary">Дата создания:</Paragraph>
// 				<CopyText text={String(new Date(product.createdAt).toLocaleString())} />
// 			</Space>
// 		</Space>
// 	);
// };

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
