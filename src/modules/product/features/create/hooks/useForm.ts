import { useCreateProductAdapter } from "@modules/product/adapters/useCreateProduct.adapter";
import type { CreateProductModel } from "@modules/product/product.model";
import type { UploadedImage } from "@modules/upload/types";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { getDefaultValues } from "../../../config";

export function useFormProductCreate() {
	const { doCreateAsync } = useCreateProductAdapter();

	const methods = useForm<CreateProductModel>({
		defaultValues: getDefaultValues(),
		mode: "onChange",
	});

	const [images, setImages] = useState<UploadedImage[]>([]);

	const handleFiles = (files: FileList) => {
		const newImages: UploadedImage[] = Array.from(files).map((file) => ({
			id: crypto.randomUUID(),
			kind: "local",
			file,
			preview: URL.createObjectURL(file),
		}));

		setImages((prev) => [...prev, ...newImages]);
	};

	const handleRemoveFile = (id: string) => {
		setImages((prev) => prev.filter((img) => img.id !== id));
	};

	const handleClearAll = () => setImages([]);

	const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
		await doCreateAsync({
			product: data,
			images: images,
		});
	};

	return {
		methods,
		images,
		handleFiles,
		handleRemoveFile,
		handleClearAll,
		onSubmit: methods.handleSubmit(onSubmit),
		isSubmitting: methods.formState.isSubmitting,
		setImages,
	};
}

// export function useFormProductCreate() {
// 	// const methods = useForm<CreateProductModel>({
// 	// 	defaultValues: getDefaultValues(),
// 	// 	mode: "onChange",
// 	// 	criteriaMode: "firstError",
// 	// 	reValidateMode: "onChange",
// 	// });

// 	// const { doCreateAsync } = useCreateProduct();

// 	// const {
// 	// 	register,
// 	// 	handleSubmit,
// 	// 	formState: { errors, isSubmitting },
// 	// } = methods;

// 	  const { doCreateAsync } = useCreateProduct();

//   const methods = useForm<CreateProductModel>({
//     defaultValues: getDefaultValues(),
//     mode: "onChange",
//   });

//   const [images, setImages] = useState<UploadedImage[]>([]);

//   const handleFiles = (files: FileList) => {
//     const newImages: UploadedImage[] = Array.from(files).map((file) => ({
//       id: crypto.randomUUID(),
//       kind: "local",
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     setImages((prev) => [...prev, ...newImages]);
//   };

//   const handleRemoveFile = (id: string) => {
//     setImages((prev) => prev.filter((img) => img.id !== id));
//   };

//   const handleClearAll = () => setImages([]);

// 	const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
// 		const isValidated = await isProductValidPipe(data);

// 		if (isValidated) {
// 			await doCreateAsync(data);
// 			toast.success("Продукт успешно создан");
// 		} else {
// 			toast.error("Произошла ошибка при создании продукта");
// 		}
// 	};

// 	return {
// 		methods,
// 		register,
// 		onSubmit: handleSubmit(onSubmit),
// 		errors,
// 		isSubmitting,
// 	};
// }
