import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { Checkbox } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { useFormContext } from "react-hook-form";

export const SaleAndNewFields: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateProductModel>();

	return (
		<Space axis="horizontal" gap={4} fullWidth align="center">
			<Checkbox
				title="Новый продукт ?"
				variant="primary"
				{...register("isNew")}
				error={errors.isNew?.message}
			/>
			<Checkbox
				title="Распродажа продукта ?"
				variant="primary"
				{...register("isSale")}
				error={errors.isSale?.message}
			/>
		</Space>
	);
};
