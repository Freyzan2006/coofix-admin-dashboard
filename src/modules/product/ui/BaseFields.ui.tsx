import { Input, Textarea } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { useFormContext } from "react-hook-form";
import { fieldsProductRules } from "../config";
import type { CreateProductModel } from "../product.model";

export const BaseFields: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateProductModel>();

	return (
		<Space axis="vertical" gap={4}>
			<Input
				title="Название продукта"
				placeholder="Название"
				type="text"
				fullWidth
				{...register("name", fieldsProductRules.name)}
				error={errors.name?.message}
			/>

			<Textarea
				fullWidth
				title="Описание продукта"
				placeholder="Описание"
				variant="primary"
				{...register("description", fieldsProductRules.description)}
				error={errors.description?.message}
			/>
		</Space>
	);
};
