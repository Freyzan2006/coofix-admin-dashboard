import { useUpdateProductAdapter } from "@modules/product/adapters/useUpdateProduct.adapter";

import {
	productCharacteristicsMapper,
	uploadImageMapper,
} from "@modules/product/product.di";
import type { UpdateProductModel } from "@modules/product/product.dto";
import type { ProductModel } from "@modules/product/product.model";
import type { UploadedImage } from "@modules/upload/types";
import { useRef, useState } from "react";
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
		images: [],
	};
}

export function useFormProductUpdate(product: ProductModel) {
	const { doUpdateAsync } = useUpdateProductAdapter();

	const methods = useForm<UpdateProductModel>({
		defaultValues: defaultValues(product),
		mode: "onChange",
	});

	const [images, setImages] = useState<UploadedImage[]>(
		uploadImageMapper.toUploadedImages(product.images || []),
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const onSubmit: SubmitHandler<UpdateProductModel> = async (data) => {
		await doUpdateAsync({
			productId: product._id,
			formData: data,
			images,
		});
	};

	return {
		methods,
		images,
		fileInputRef,
		onSubmit: methods.handleSubmit(onSubmit),
		isSubmitting: methods.formState.isSubmitting,
		setImages,
	};
}
