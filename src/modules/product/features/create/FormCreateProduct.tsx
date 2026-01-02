import { useCreateProduct } from "@modules/product/adapters/useCreateProduct.hook";
import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { PlusIcon } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useFormProductCreate } from "./hooks/useForm";
import { BaseFields } from "./ui/BaseFields.ui";
import { CategoryAndBrandFields } from "./ui/CategoryAndBrandFields.ui";
import { CharacteristicsFields } from "./ui/CharacteristicsFields.ui";
import { ImageFields } from "./ui/ImageFields.ui";
import { PriceAndQuantityFields } from "./ui/PriceAndQuantityFields.ui";
import { SaleAndNewFields } from "./ui/SaleAndNewFields.ui";

export const FormCreateProduct: React.FC = () => {
	const { methods, onSubmit, isSubmitting } = useFormProductCreate();
	const { isError, isPending, isSuccess } = useCreateProduct();

	return (
		<FormProvider {...methods}>
			<Form onSubmit={onSubmit} className="space-y-6">
				<BaseFields />

				<PriceAndQuantityFields />
				<CategoryAndBrandFields />
				<SaleAndNewFields />
				<ImageFields />
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
