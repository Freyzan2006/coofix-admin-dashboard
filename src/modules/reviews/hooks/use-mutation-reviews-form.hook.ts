import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutationReviewsAdapter } from "../adapters/use-mutation-reviews.adapter";
import type { MutationReviewsDto } from "../reviews.dto";

export function useMutationReviewsForm(productId: string) {
	const { createReviewAsync, isPending, isSuccess, isError } =
		useMutationReviewsAdapter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MutationReviewsDto>({
		defaultValues: {
			rating: 5,
			text: "",
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<MutationReviewsDto> = async (data) => {
		const dto: MutationReviewsDto = {
			productId,
			rating: data.rating,
			text: data.text,
		};
		await createReviewAsync(dto);
	};

	return {
		register,
		handleSubmit,
		onSubmit,
		isPending,
		isSuccess,
		isError,
		errors,
	};
}
