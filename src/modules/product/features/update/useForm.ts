import { useUpdateProductAdapter } from "@modules/product/adapters/useUpdateProduct.adapter";
import {
	productCharacteristicsMapper,
	uploadImageMapper,
} from "@modules/product/product.di";
import type { UpdateProductModel } from "@modules/product/product.dto";
import type { ProductModel } from "@modules/product/product.model";
import { useUploadForm } from "@modules/upload/features/image-dropzone-v2";

import { type SubmitHandler, useForm } from "react-hook-form";

function defaultValues(product: ProductModel) {
	return {
		name: product.name,
		description: product.description,
		price: product.price,
		oldPrice: product.oldPrice ?? 0,
		category: product.category?._id ?? "",
		brand: product.brand?._id ?? "",

		characteristics: productCharacteristicsMapper.toModel(
			product.characteristics || {},
		),
		quantity: product.quantity,
		isNew: product.isNew,
		isSale: product.isSale,
	};
}

export function useFormProductUpdate(product: ProductModel) {
	const { doUpdateAsync } = useUpdateProductAdapter();

	const methods = useForm<UpdateProductModel>({
		defaultValues: defaultValues(product),
		mode: "onChange",
	});

	const defaultImages = product.images
		? uploadImageMapper.toUploadedImages(product.images)
		: [];

	const imagesField = useUploadForm<UpdateProductModel>({
		name: "images",
		control: methods.control,
		minFiles: 0,
		maxFiles: 5,
		required: false,
		defaultValue: defaultImages,
	});

	const onSubmit: SubmitHandler<UpdateProductModel> = async (data) => {
		await doUpdateAsync({
			productId: product._id,
			formData: data,
			images: imagesField.field.value,
		});
	};

	return {
		methods,

		onSubmit: methods.handleSubmit(onSubmit),
		isSubmitting: methods.formState.isSubmitting,

		images: imagesField,
	};
}
