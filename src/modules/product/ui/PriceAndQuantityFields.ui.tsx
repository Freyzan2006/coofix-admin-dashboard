import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { Input } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { useFormContext } from "react-hook-form";
import { fieldsProductRules } from "../config";

export const PriceAndQuantityFields: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateProductModel>();

	return (
		<Space align="center" axis="horizontal" gap={4}>
			<Input
				title="Цена продукта"
				type="number"
				variant="primary"
				{...register("price", fieldsProductRules.price)}
				error={errors.price?.message}
			/>
			<Input
				title="Старая цена продукта"
				type="number"
				variant="primary"
				{...register("oldPrice", fieldsProductRules.oldPrice)}
				error={errors.oldPrice?.message}
			/>

			<Input
				title="Количество"
				type="number"
				variant="primary"
				{...register("quantity", fieldsProductRules.quantity)}
				error={errors.quantity?.message}
			/>
		</Space>
	);
};
