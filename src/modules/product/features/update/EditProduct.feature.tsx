import { useProductAdapter } from "@modules/product/adapters/useProduct.adapter";
import { Alert } from "@shared/ui/Alert.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { FormUpdateProduct } from "./FormUpdateProduct";

interface IEditProductFormProps {
	slug: string;
}

export const EditProduct: React.FC<IEditProductFormProps> = ({ slug }) => {
	const { product, productIsError, productIsLoading } = useProductAdapter(slug);

	if (productIsError) {
		return (
			<Space gap={3} align="center" justify="center">
				<Alert variant="danger">
					Произошла ошибка при загрузке продукта. Попробуйте ещё раз потом
				</Alert>
			</Space>
		);
	}

	if (productIsLoading) {
		return (
			<Space gap={3} align="center" justify="center">
				<Loading />
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

	return (
		<Space gap={3} align="center" justify="center">
			<FormUpdateProduct product={product} />
		</Space>
	);
};
