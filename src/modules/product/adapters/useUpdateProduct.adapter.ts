// import type { UploadedImage } from "@modules/upload/types";

import type { UploadedImage } from "@modules/upload";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { productService } from "../product.di";
import type { UpdateProductModel } from "../product.dto";

interface UpdateProductFormData {
	productId: string;
	formData: UpdateProductModel;
	images: UploadedImage[];
}

export function useUpdateProductAdapter() {
	const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
		mutationFn: async (data: UpdateProductFormData) => {
			await productService.updateProduct(
				data.productId,
				data.formData,
				data.images,
			);
		},
		onSuccess: () => {
			toast.success("Продукт успешно обновлен");
		},
		onError: () => {
			toast.error("Произошла ошибка при обновлении продукта");
		},
	});

	return {
		doUpdate: mutate,
		doUpdateAsync: mutateAsync,
		isPending,
		isError,
		isSuccess,
	};
}
