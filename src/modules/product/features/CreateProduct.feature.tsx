import { Button } from "@shared/ui/Button.ui";
import { Checkbox, Input, Textarea } from "@shared/ui/fields";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from "@shared/ui/modal";

import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateProductModel } from "../model/create-product.model";
import { Form } from "@shared/ui/Form.ui";

export const CreateProductModal: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductModel>({
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			oldPrice: 0,
			category: "",
			brand: "",
			images: [],
			characteristics: {},
			quantity: 0,
			isNew: false,
			isSale: false,
		},
		mode: "onChange",
		criteriaMode: "firstError",
		reValidateMode: "onChange",
	});

	const onSubmit: SubmitHandler<CreateProductModel> = (data) =>
		console.log(data);

	console.log(errors.description?.message);

	return (
		<Modal>
			<ModalTrigger className="btn btn-primary">Создать продукт</ModalTrigger>

			<ModalContent size="lg">
				<ModalHeader
					title="Создание продукта"
					description="Заполните все необходимые поля"
				/>

				<Form title="Вход в админ панель" onSubmit={handleSubmit(onSubmit)}>
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
								minLength: {
									value: 0.1,
									message: "Минимальная 0.1 цена",
								},
								maxLength: {
									value: 1000000,
									message: "Максимальная 1000000 цена",
								},
							})}
							error={errors.price?.message}
						/>
						<Input
							title="Старая цена продукта"
							type="number"
							variant="primary"
							{...register("oldPrice", {
								required: "Старая цена обязательно",
								minLength: {
									value: 0.1,
									message: "Минимальная 0.1 цена",
								},
								maxLength: {
									value: 1000000,
									message: "Максимальная 1000000 цена",
								},
							})}
							error={errors.oldPrice?.message}
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
						<Input
							title="Количество"
							type="number"
							variant="primary"
							{...register("quantity", {
								required: "Количество обязательно",
								minLength: {
									value: 1,
									message: "Минимум 1 количество",
								},
								maxLength: {
									value: 10000,
									message: "Максимум 10000 количество",
								},
							})}
							error={errors.quantity?.message}
						/>

						<Checkbox title="Новый продукт ?" variant="primary" />

						<Checkbox
							title="Распродажа продукта ?"
							type="checkbox"
							variant="primary"
						/>
					</section>

					<Input title="Картинки массив" type="text" variant="primary" />

					<Input title="Характеристики" type="text" />

					<Button type="submit" variant="success">
						Создать
					</Button>
				</Form>
			</ModalContent>
		</Modal>
	);
};
