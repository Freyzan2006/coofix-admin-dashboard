import { Button } from "@shared/ui/Button.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { TrashIcon } from "lucide-react";
import { useDeleteReviewsAdapter } from "../adapters/use-delete-reviews.adapter";

interface IDeleteReviewsProps {
	reviewId: string;
}

export const DeleteReviews: React.FC<IDeleteReviewsProps> = ({ reviewId }) => {
	const { deleteReviewAsync, isPending } = useDeleteReviewsAdapter();

	const handleDelete = async (reviewId: string) => {
		await deleteReviewAsync(reviewId);
	};

	return (
		<Button
			variant="danger"
			size="sm"
			onClick={() => handleDelete(reviewId)}
			disabled={isPending}
		>
			{isPending && <Loading />} <TrashIcon />
		</Button>
	);
};
