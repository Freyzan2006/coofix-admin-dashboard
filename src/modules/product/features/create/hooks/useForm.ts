import { useCreateProduct } from "@modules/product/adapters/useCreateProduct.hook";

import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { toast } from "@shared/ui/toast";
import { type SubmitHandler, useForm } from "react-hook-form";
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
		const names = data.characteristics.map((c) => c.name.trim());

		if (new Set(names).size !== names.length) {
			toast.error("Названия характеристик должны быть уникальны");
			return;
		}

		await doCreateAsync(data);
	};

	return {
		methods,
		register,
		onSubmit: handleSubmit(onSubmit),
		errors,
		isSubmitting,
	};
}
