import { useCreateProductAdapter } from "@modules/product/adapters/useCreateProduct.adapter";
import type { CreateProductModel } from "@modules/product/product.model";
import { useUploadForm } from "@modules/upload/features/image-dropzone-v2";
import { type SubmitHandler, useForm } from "react-hook-form";
import { getDefaultValues } from "../../../config";

export function useFormProductCreate() {
	const { doCreateAsync } = useCreateProductAdapter();

	const methods = useForm<CreateProductModel>({
		defaultValues: getDefaultValues(),
		mode: "onChange",
	});

	const images = useUploadForm<CreateProductModel>({
		name: "images",
		control: methods.control,
		minFiles: 0,
		maxFiles: 5,
		required: false,
		defaultValue: [],
	});

	const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
		await doCreateAsync({
			product: data,
			images: images.field.value,
		});
	};

	return {
		methods,
		images,

		onSubmit: methods.handleSubmit(onSubmit),
		isSubmitting: methods.formState.isSubmitting,
	};
}
