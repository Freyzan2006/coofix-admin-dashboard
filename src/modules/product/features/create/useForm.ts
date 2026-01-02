import { useCreateProduct } from "@modules/product/adapters/useCreateProduct.hook";
import type { CreateProductDto } from "@modules/product/api/product.dto";
import type { CreateProductModel } from "@modules/product/model/create-product.model";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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

	return {
		methods,
		register,
		onSubmit: handleSubmit(onSubmit),
		errors,
		isSubmitting,

		characteristics: {
			fields,
			append,
			remove,
		},
	};
}
