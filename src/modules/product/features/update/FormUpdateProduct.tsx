import type { ProductModel } from "@modules/product/product.model";
import { BaseFields } from "@modules/product/ui/BaseFields.ui";
import { CategoryAndBrandFields } from "@modules/product/ui/CategoryAndBrandFields.ui";
import { CharacteristicsFields } from "@modules/product/ui/CharacteristicsFields.ui";
import { ImageFields } from "@modules/product/ui/ImageFields.ui";
import { PriceAndQuantityFields } from "@modules/product/ui/PriceAndQuantityFields.ui";
import { SaleAndNewFields } from "@modules/product/ui/SaleAndNewFields.ui";

import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { PlusIcon } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useFormProductUpdate } from "./useForm";

interface IFormUpdateProductProps {
	product: ProductModel;
}

export const FormUpdateProduct: React.FC<IFormUpdateProductProps> = ({
	product,
}) => {
	const { methods, onSubmit, isSubmitting, images } =
		useFormProductUpdate(product);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={onSubmit} className="space-y-6">
				<BaseFields />

				<PriceAndQuantityFields />
				<CategoryAndBrandFields />
				<SaleAndNewFields />
				<ImageFields images={images} />
				<CharacteristicsFields />

				{/* {isError && (
					<Alert variant="danger">Произошла ошибка при обновлении продукта</Alert>
				)}

				{isSuccess && <Alert variant="success">Продукт успешно обновлён</Alert>} */}

				<Space className="mt-6">
					<Button
						type="submit"
						variant="warning"
						disabled={isSubmitting}
						className="w-full"
					>
						{isSubmitting ? (
							<Loading />
						) : (
							<>
								<PlusIcon /> Обновить продукт
							</>
						)}
					</Button>
				</Space>
			</Form>
		</FormProvider>
	);
};
