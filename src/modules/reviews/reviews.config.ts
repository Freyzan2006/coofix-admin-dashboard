import type { FormRules } from "@shared/types";
import type { MutationReviewsDto } from "./reviews.dto";

export const ReviewsRuleForm: FormRules<MutationReviewsDto> = {
	text: {
		required: "Текс в отзаве обезательный",
		minLength: { value: 10, message: "Минимальная длина текста 10 символов" },
		maxLength: {
			value: 500,
			message: "Максимальная длина текста 500 символов",
		},
		pattern: {
			value: /^[a-zA-Z0-9\s]+$/,
			message: "Текст должен содержать только буквы, цифры и пробелы",
		},
	},
	rating: {
		required: "Оценка обязательна",
		min: { value: 1, message: "Оценка должна быть не менее 1" },
		max: { value: 5, message: "Оценка должна быть не более 5" },
	},
};
