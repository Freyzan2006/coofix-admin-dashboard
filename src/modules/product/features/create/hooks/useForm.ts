import { useCreateProduct } from "@modules/product/adapters/useCreateProduct.hook";

import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { toast } from "@shared/ui/toast";
import { type SubmitHandler, useForm } from "react-hook-form";
import { isProductValidPipe } from "../pipe/validate";
import { getDefaultValues } from "./config";

export function useFormProductCreate() {
	const methods = useForm<CreateProductModel>({
		defaultValues: getDefaultValues(),
		mode: "onChange",
		criteriaMode: "firstError",
		reValidateMode: "onChange",
	});

	const { doCreateAsync } = useCreateProduct();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
		const isValidated = await isProductValidPipe(data);

		if (isValidated) {
			await doCreateAsync(data);
			toast.success("Продукт успешно создан");
		} else {
			toast.error("Произошла ошибка при создании продукта");
		}
	};

	return {
		methods,
		register,
		onSubmit: handleSubmit(onSubmit),
		errors,
		isSubmitting,
	};
}
