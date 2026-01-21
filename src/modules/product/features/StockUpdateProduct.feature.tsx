import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Input } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { useForm } from "react-hook-form";
import { useStockUpdateProduct } from "../adapters/use-stock-update-product.adapter";
import { useProductAdapter } from "../adapters/useProduct.adapter";
import { fieldsStockRules } from "../config";
import type { StockUpdateProductDto } from "../product.dto";

interface IStockUpdateProductProps {
	productId: string;
	slug: string;
}

export const StockUpdateProduct: React.FC<IStockUpdateProductProps> = ({
	productId,
	slug,
}) => {
	const { product } = useProductAdapter(slug);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StockUpdateProductDto>({
		defaultValues: {
			stock: product?.stock || 0,
		},
		mode: "onChange",
	});

	const { updateStockAsync, isPending, isError, error } =
		useStockUpdateProduct(productId);

	const onSubmit = handleSubmit((data) => updateStockAsync(data));

	return (
		<Form onSubmit={onSubmit}>
			<Space axis="vertical" gap={4}>
				<Heading variant="secondary">Пополнить товар</Heading>
				<Input
					title="Количество(шт.)"
					type="number"
					min={0}
					error={errors.stock?.message}
					{...register("stock", fieldsStockRules.stock)}
				/>
				<Button type="submit" disabled={isPending}>
					{isPending ? <Loading /> : "Обновить"}
				</Button>
				{isError && <Alert variant="danger">{error?.message}</Alert>}
			</Space>
		</Form>
	);
};
