import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Input, Textarea } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import { Heading } from "@shared/ui/text";
import { useMutationReviewsForm } from "../hooks/use-mutation-reviews-form.hook";
import { ReviewsRuleForm } from "../reviews.config";

interface ICreateReviewsProps {
	productId: string | null;
}

export const MutationReviews: React.FC<ICreateReviewsProps> = ({
	productId,
}) => {
	const {
		register,
		handleSubmit,
		onSubmit,
		isPending,
		isSuccess,
		isError,
		errors,
	} = useMutationReviewsForm(productId || "");

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Heading>Добавить отзыв</Heading>

			<Textarea
				title="Комментарий"
				id="text"
				{...register("text", ReviewsRuleForm.text)}
				error={errors.text?.message}
			/>

			<Input
				title="Оценка"
				type="number"
				id="rating"
				{...register("rating", ReviewsRuleForm.rating)}
				error={errors.rating?.message}
			/>

			{errors.root?.message && (
				<Alert variant="danger">{errors.root?.message}</Alert>
			)}

			{isSuccess && <Alert variant="success">Отзыв успешно добавлен</Alert>}

			{isError && <Alert variant="danger">Ошибка при добавлении отзыва</Alert>}

			<Button type="submit" variant="success" disabled={isPending}>
				{isPending && <Loading />} Добавить отзыв
			</Button>
		</Form>
	);
};
