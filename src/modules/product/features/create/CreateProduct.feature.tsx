import type { CreateProductDto } from "@modules/product/api/product.dto";
import { ImageDropzone } from "@shared/features/UploadFile";
import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Checkbox, Input, Select, Textarea } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalTrigger,
} from "@shared/ui/modal";
import { Space } from "@shared/ui/Space.ui";
import { Spinner } from "@shared/ui/Spinner.ui";
import { Heading, Label } from "@shared/ui/text";
import { PlusIcon, XIcon } from "lucide-react";
import type React from "react";
import {
	FormProvider,
	type SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form";
import { useCreateProduct } from "../../adapters/useCreateProduct.hook";
import type { CreateProductModel } from "../../model/create-product.model";

export const CreateProduct: React.FC = () => {
	const methods = useForm<CreateProductModel>({
		defaultValues: {
			name: "Product test. name",
			description: "Product test. description",
			price: 300,
			oldPrice: 200,
			category: "",
			brand: "",
			images: ["https://images.hello", "https://images.hello"],
			characteristics: [{ name: "Частота", value: "33Гц" }],
			quantity: 30,
			isNew: true,
			isSale: false,
		},
		mode: "onChange",
		criteriaMode: "firstError",
		reValidateMode: "onChange",
	});

	const {
		doCreateAsync,
		isError,
		isPending,
		isSuccess,
		brands,
		brandsIsError,
		brandsIsLoading,
		categories,
		categoriesIsError,
		categoriesIsLoading,
	} = useCreateProduct();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = methods;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "characteristics",
	});

	const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
		// ---------- 1. Валидация характеристик ----------
		const names = data.characteristics.map((c) => c.name.trim());

		if (new Set(names).size !== names.length) {
			alert("Названия характеристик должны быть уникальны");
			return;
		}

		// ---------- 2. characteristics: array → object ----------
		const characteristics: Record<string, string> = Object.fromEntries(
			data.characteristics
				.filter((c) => c.name.trim())
				.map((c) => [c.name.trim(), c.value]),
		);

		// ---------- 3. Финальный payload ----------
		const payload: CreateProductDto = {
			...data,
			characteristics,
		};

		// ---------- 4. FormData ----------
		const formData = new FormData();

		// обычные поля
		Object.entries(payload).forEach(([key, value]) => {
			if (key === "images") return;
			if (key === "characteristics") {
				// backend ждёт object → отправляем JSON
				formData.append("characteristics", JSON.stringify(value));
				return;
			}

			// boolean / number → string
			formData.append(key, String(value));
		});

		// ---------- 5. images ----------
		payload.images.forEach((file) => {
			formData.append("images", file); // ⬅️ ВАЖНО: без индексов
		});

		// ---------- 6. DEBUG ----------

		for (const [k, v] of formData.entries()) {
			console.log(k, v);
		}

		console.log("Final payload:", payload);

		// ---------- 7. SEND ----------
		await doCreateAsync(payload);
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

						<Space align="center" axis="horizontal" gap={4}>
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
						</Space>

						<Space align="center" axis="horizontal" fullWidth>
							<Space gap={3} axis="vertical" fullWidth>
								<Label htmlFor="category">Категория</Label>

								{categoriesIsLoading ? (
									<Spinner />
								) : (
									<Select
										id="category"
										items={categories}
										{...register("category", { required: true })}
										error={errors.category?.message}
									/>
								)}

								{categoriesIsError && (
									<Alert variant="danger">
										Произошла ошибка при загрузке категорий
									</Alert>
								)}
							</Space>

							<Space gap={3} axis="vertical" fullWidth>
								<Label htmlFor="brand">Бренд</Label>
								{brandsIsLoading ? (
									<Spinner />
								) : (
									<Select
										id={"brand"}
										items={brands}
										{...register("brand", { required: true })}
										error={errors.brand?.message}
									/>
								)}
								{brandsIsError && (
									<Alert variant="danger">
										Произошла ошибка при загрузке брендов
									</Alert>
								)}
							</Space>
						</Space>

						<Space axis="horizontal" gap={4} fullWidth align="center">
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
						</Space>

						<ImageDropzone
							name="images"
							maxFiles={5}
							maxSize={10 * 1024 * 1024} // 10MB
							onFilesChange={(files) => console.log("Files changed:", files)}
						/>

						<Space
							axis="vertical"
							gap={3}
							fullWidth
							className="overflow-y-scroll max-h-[200px]"
						>
							<Heading variant="primary">Характеристики:</Heading>

							{fields.map((field, index) => (
								<Space
									key={field.id}
									axis="horizontal"
									align="center"
									justify="center"
									gap={5}
								>
									<Input
										{...register(`characteristics.${index}.name`, {
											required: true,
										})}
										placeholder="Название (Частота)"
									/>

									<Input
										{...register(`characteristics.${index}.value`, {
											required: true,
										})}
										placeholder="Значение (33Гц)"
									/>
									<Button variant="danger" onClick={() => remove(index)}>
										<XIcon />
									</Button>
								</Space>
							))}

							<Button
								className="max-w-[280px]"
								variant="success"
								onClick={() => append({ name: "", value: "" })}
							>
								<PlusIcon /> Добавить характеристику
							</Button>
						</Space>

						{isError && (
							<Alert variant="danger">
								Произошла ошибка при создании продукта
							</Alert>
						)}

						{isSuccess && (
							<Alert variant="success">Продукт успешно создан</Alert>
						)}

						<Space className="mt-6">
							<Button
								type="submit"
								variant="success"
								disabled={isSubmitting}
								className="w-full"
							>
								<PlusIcon />
								{isSubmitting || isPending ? <Loading /> : "Создать продукт"}
							</Button>
						</Space>
					</Form>

					<ModalFooter>
						<ModalClose>Отменить</ModalClose>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</FormProvider>
	);
};
