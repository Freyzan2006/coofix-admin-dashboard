export const getDefaultValues = () => ({
	name: "Product test. name",
	description: "Product test. description",
	price: 300,
	oldPrice: 200,
	images: [],
	characteristics: [{ name: "Частота", value: "33Гц" }],
	quantity: 30,
	isNew: true,
	isSale: false,
});

export const fieldsProductRules = {
	name: {
		required: "Название обязательно",
		minLength: {
			value: 1,
			message: "Минимум 1 символ",
		},
		maxLength: {
			value: 255,
			message: "Максимум 255 символов",
		},
	},
	description: {
		required: "Описание обязательно",
		minLength: {
			value: 5,
			message: "Минимум 5 символ",
		},
		maxLength: {
			value: 2000,
			message: "Максимум 2000 символов",
		},
	},
	price: {
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
	},
	oldPrice: {
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
	},
	quantity: {
		required: "Количество обязательно",
		min: {
			value: 1,
			message: "Минимальное количество 1",
		},
		max: {
			value: 1000000,
			message: "Максимальное количество 1000000",
		},
		valueAsNumber: true,
	},
	category: {
		required: "Категория обязательно",
		validate: (value: string) => {
			if (!value || value.trim() === "") {
				return "Категория обязательна";
			}
			return true;
		},
	},
	brand: {
		required: "Бренд обязательно",
		validate: (value: string) => {
			if (!value || value.trim() === "") {
				return "Бренд обязателен";
			}
			return true;
		},
	},
	characteristics: {
		key: {
			required: "Название характеристики обязательно",
			minLength: {
				value: 1,
				message: "Минимум 1 символ",
			},
			maxLength: {
				value: 255,
				message: "Максимум 255 символов",
			},
		},
		value: {
			required: "Значение характеристики обязательно",
			minLength: {
				value: 1,
				message: "Минимум 1 символ",
			},
			maxLength: {
				value: 255,
				message: "Максимум 255 символов",
			},
		},
	},
};
