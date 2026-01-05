import { useCreateProductAdapter } from "@modules/product/adapters/useCreateProduct.adapter";
import { BaseFields } from "@modules/product/ui/BaseFields.ui";
import { CategoryAndBrandFields } from "@modules/product/ui/CategoryAndBrandFields.ui";
import { CharacteristicsFields } from "@modules/product/ui/CharacteristicsFields.ui";
import { ImageFields } from "@modules/product/ui/ImageFields.ui";
import { PriceAndQuantityFields } from "@modules/product/ui/PriceAndQuantityFields.ui";
import { SaleAndNewFields } from "@modules/product/ui/SaleAndNewFields.ui";
import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { PlusIcon } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useFormProductCreate } from "./hooks/useForm";

export const FormCreateProduct: React.FC = () => {
	const { methods, onSubmit, isSubmitting, images, setImages } =
		useFormProductCreate();
	const { isError, isPending, isSuccess } = useCreateProductAdapter();

	return (
		<FormProvider {...methods}>
			<Form onSubmit={onSubmit} className="space-y-6">
				<BaseFields />

				<PriceAndQuantityFields />
				<CategoryAndBrandFields />
				<SaleAndNewFields />
				<ImageFields initialImages={images} onChange={setImages} />
				<CharacteristicsFields />

				{isError && (
					<Alert variant="danger">Произошла ошибка при создании продукта</Alert>
				)}

				{isSuccess && <Alert variant="success">Продукт успешно создан</Alert>}

				<Space className="mt-6">
					<Button
						type="submit"
						variant="success"
						disabled={isSubmitting}
						className="w-full"
					>
						{isSubmitting || isPending ? (
							<Loading />
						) : (
							<>
								<PlusIcon /> Создать продукт
							</>
						)}
					</Button>
				</Space>
			</Form>
		</FormProvider>
	);
};
