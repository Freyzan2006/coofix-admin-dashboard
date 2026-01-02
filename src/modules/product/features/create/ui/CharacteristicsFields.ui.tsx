import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { Button } from "@shared/ui/Button.ui";
import { Input } from "@shared/ui/fields";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { PlusIcon, XIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { fieldsProductRules } from "../config";
import { useFormProductCreate } from "../useForm";

export const CharacteristicsFields: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateProductModel>();

	const { characteristics } = useFormProductCreate();

	function handlerAdd() {
		characteristics.append({
			name: "",
			value: "",
		});
	}

	function handlerRemove(index: number) {
		characteristics.remove(index);
	}

	return (
		<Space
			axis="vertical"
			gap={3}
			fullWidth
			className="overflow-y-scroll max-h-[400px]"
		>
			<Heading variant="primary">Характеристики:</Heading>

			{characteristics.fields.map((field, index) => (
				<Space
					key={field.id}
					axis="horizontal"
					align="center"
					justify="center"
					gap={5}
				>
					<Input
						title="Название"
						{...register(
							`characteristics.${index}.name`,
							fieldsProductRules.characteristics.key,
						)}
						placeholder="Название (Частота)"
						error={errors.characteristics?.[index]?.name?.message}
					/>

					<Input
						title="Значение"
						{...register(
							`characteristics.${index}.value`,
							fieldsProductRules.characteristics.value,
						)}
						placeholder="Значение (33Гц)"
						error={errors.characteristics?.[index]?.value?.message}
					/>
					<Button variant="danger" onClick={() => handlerRemove(index)}>
						<XIcon />
					</Button>
				</Space>
			))}

			<Button className="max-w-[280px]" variant="success" onClick={handlerAdd}>
				<PlusIcon /> Добавить характеристику
			</Button>
		</Space>
	);
};
