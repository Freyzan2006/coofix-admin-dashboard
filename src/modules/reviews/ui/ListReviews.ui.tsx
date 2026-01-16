import { Alert } from "@shared/ui/Alert.ui";

import { Card } from "@shared/ui/Card.ui";
import { List, ListItem } from "@shared/ui/list";
import { Skeleton } from "@shared/ui/Skeleton.ui";
import { Space } from "@shared/ui/Space.ui";
import { CopyText, Label, Paragraph } from "@shared/ui/text";
import { StarIcon } from "lucide-react";
import { useAllReviewsAdapter } from "../adapters/use-all-reviews.adapter";
import { DeleteReviews } from "../features/DeleteReviews.feature";

interface IListReviewsProps {
	productId: string | null;
}

export const ListReviews: React.FC<IListReviewsProps> = ({ productId }) => {
	const { reviews, isLoadingReviews, errorReviews } = useAllReviewsAdapter(
		productId || "",
	);

	console.log(`Reviews for ${productId}:`, reviews);

	return (
		<Space axis="vertical" gap={3} align="center" justify="center">
			{isLoadingReviews ? (
				<Skeleton variant="secondary" />
			) : errorReviews ? (
				<Alert variant="danger">Error: {errorReviews.message}</Alert>
			) : reviews?.length ? (
				<List fullWidth variant="secondary">
					{reviews.map((review, index) => (
						<Card key={review._id}>
							<ListItem variant="primary">
								<Paragraph variant="secondary" size="sm">
									отзыв №{index + 1}
								</Paragraph>
								<CopyText text={review.text} />
							</ListItem>

							<ListItem>
								<Label>Автор: {review.user.name}</Label>
							</ListItem>

							<ListItem>
								<Space
									justify="center"
									axis="horizontal"
									align="center"
									gap={1}
								>
									<StarIcon color="gold" size={24} />
									<Label>{review.rating}</Label>
								</Space>
								<Space
									justify="center"
									axis="horizontal"
									align="center"
									gap={1}
								>
									<DeleteReviews reviewId={review._id} />
								</Space>

								<Space justify="center" axis="vertical" gap={3}>
									<Label>{new Date(review.createdAt).toLocaleString()}</Label>
									<Label>{new Date(review.updatedAt).toLocaleString()}</Label>
								</Space>
							</ListItem>
						</Card>
					))}
				</List>
			) : (
				<Alert variant="info">Отзовово нету у этого товара</Alert>
			)}
		</Space>
	);
};
