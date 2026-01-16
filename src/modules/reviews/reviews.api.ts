import type { RestApiCliType } from "@shared/api/rest-api/client";
import type {
	MutationReviewsDto,
	ReviewResponseDto,
	ReviewsDto,
	ReviewsResponseDto,
} from "./reviews.dto";

interface IReviewsApi {
	getReviews(productId: string): Promise<ReviewsDto[]>;
	mutateReview(dto: MutationReviewsDto): Promise<ReviewsDto>;
	deleteReview(reviewId: string): Promise<ReviewsDto>;
}

class ReviewsRestApi implements IReviewsApi {
	constructor(private readonly client: RestApiCliType) {}

	public async getReviews(productId: string): Promise<ReviewsDto[]> {
		const response = await this.client.get<ReviewsResponseDto>(
			`/reviews/${productId}`,
		);
		return response.data.reviews;
	}

	public async mutateReview(dto: MutationReviewsDto): Promise<ReviewsDto> {
		const response = await this.client.post<ReviewResponseDto>(`/reviews`, dto);
		return response.data.review;
	}

	public async deleteReview(reviewId: string): Promise<ReviewsDto> {
		const response = await this.client.delete<ReviewResponseDto>(
			`/reviews/admin/${reviewId}`,
		);
		return response.data.review;
	}
}

export { ReviewsRestApi };
export type { IReviewsApi };
