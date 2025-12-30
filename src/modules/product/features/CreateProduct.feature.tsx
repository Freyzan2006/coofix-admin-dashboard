import { ImageDropzone } from "@shared/features/UploadFile";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Checkbox, Input, Textarea } from "@shared/ui/fields";
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
} from "@shared/ui/modal";
import { PlusIcon } from "lucide-react";
import type React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import type { CreateProductModel } from "../model/create-product.model";

export const CreateProductModal: React.FC = () => {
	const methods = useForm<CreateProductModel>({
		defaultValues: {
			name: "Product test. name",
			description: "Product test. description",
			price: 300,
			oldPrice: 200,
			category: "Product test. category",
			brand: "Product test. brand",
			images: ["https://images.hello", "https://images.hello"],
			characteristics: {
				color: "Product test. color",
			},
			quantity: 30,
			isNew: true,
			isSale: false,
		},
		mode: "onChange",
		criteriaMode: "firstError",
		reValidateMode: "onChange",
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
		console.log("Form data:", data);

		const formData = new FormData();

		Object.keys(data).forEach((key) => {
			if (key !== "images") {
				formData.append(key, String(data[key as keyof CreateProductModel]));
			}
		});

		if (data.images && data.images.length > 0) {
			data.images.forEach((file, index) => {
				formData.append(`images[${index}]`, file);
			});
		}

		console.log("FormData ready for upload:", formData);
	};

	return (
		<FormProvider {...methods}>
			<Modal>
				<ModalTrigger className="btn btn-primary">
					<PlusIcon /> Создать продукт
				</ModalTrigger>

				<ModalContent size="lg">
					<ModalHeader
						title="Создание продукта"
						description="Заполните все необходимые поля"
					/>

					<Form title="Создание продукта" onSubmit={handleSubmit(onSubmit)}>
						<Input
							title="Название продукта"
							placeholder="Название"
							type="text"
							fullWidth
							{...register("name", {
								required: "Название обязательно",
								minLength: {
									value: 1,
									message: "Минимум 1 символ",
								},
								maxLength: {
									value: 255,
									message: "Максимум 255 символов",
								},
							})}
							error={errors.name?.message}
						/>

						<Textarea
							fullWidth
							title="Описание продукта"
							placeholder="Описание"
							variant="primary"
							{...register("description", {
								required: "Описание обязательно",
								minLength: {
									value: 5,
									message: "Минимум 5 символ",
								},
								maxLength: {
									value: 2000,
									message: "Максимум 2000 символов",
								},
							})}
							error={errors.description?.message}
						/>

						<section className="flex flex-row gap-4 items-center">
							<Input
								title="Цена продукта"
								type="number"
								variant="primary"
								{...register("price", {
									required: "Цена обязательно",
									min: {
										value: 0.1,
										message: "Минимальная 0.1 цена",
									},
									max: {
										value: 1000000,
										message: "Максимальная 1000000 цена",
									},
									valueAsNumber: true,
								})}
								error={errors.price?.message}
							/>
							<Input
								title="Старая цена продукта"
								type="number"
								variant="primary"
								{...register("oldPrice", {
									required: "Старая цена обязательно",
									min: {
										value: 0.1,
										message: "Минимальная 0.1 цена",
									},
									max: {
										value: 1000000,
										message: "Максимальная 1000000 цена",
									},
									valueAsNumber: true,
								})}
								error={errors.oldPrice?.message}
							/>

							<Input
								title="Количество"
								type="number"
								variant="primary"
								{...register("quantity", {
									required: "Количество обязательно",
									min: {
										value: 1,
										message: "Минимум 1 количество",
									},
									max: {
										value: 10000,
										message: "Максимум 10000 количество",
									},
									valueAsNumber: true,
								})}
								error={errors.quantity?.message}
							/>
						</section>

						<section className="flex flex-row gap-4 items-center">
							<Input
								title="Категория продукта"
								type="text"
								variant="primary"
								{...register("category", {
									required: "Категория обязательно",
									minLength: {
										value: 1,
										message: "Минимум 1 символ",
									},
									maxLength: {
										value: 255,
										message: "Максимум 255 символов",
									},
								})}
								error={errors.category?.message}
							/>
							<Input
								title="Бренд продукта"
								type="text"
								variant="primary"
								{...register("brand", {
									required: "Бренд обязательно",
									minLength: {
										value: 1,
										message: "Минимум 1 символ",
									},
									maxLength: {
										value: 255,
										message: "Максимум 255 символов",
									},
								})}
								error={errors.brand?.message}
							/>
						</section>

						<section className="flex flex-row gap-4 items-center">
							<Checkbox
								title="Новый продукт ?"
								variant="primary"
								{...register("isNew")}
							/>
							<Checkbox
								title="Распродажа продукта ?"
								variant="primary"
								{...register("isSale")}
							/>
						</section>

						<ImageDropzone
							name="images"
							maxFiles={5}
							maxSize={10 * 1024 * 1024} // 10MB
							onFilesChange={(files) => console.log("Files changed:", files)}
						/>

						<Input title="Характеристики" type="text" />

						<div className="mt-6">
							<Button
								type="submit"
								variant="success"
								disabled={isSubmitting}
								className="w-full"
							>
								{isSubmitting ? (
									<>
										<span className="loading loading-spinner"></span>
										Создание...
									</>
								) : (
									"Создать продукт"
								)}
							</Button>
						</div>
					</Form>

					<ModalFooter>
						<ModalClose>Отменить</ModalClose>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</FormProvider>
	);
};
