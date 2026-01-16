export interface ReviewsResponseDto {
	success: boolean;
	reviews: ReviewsDto[];
}

export interface ReviewResponseDto {
	success: boolean;
	review: ReviewsDto;
}

interface UserReviewDto {
	_id: string;
	name: string;
}

export interface ReviewsDto {
	_id: string;
	product: string;
	user: UserReviewDto;
	rating: number;
	text: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface MutationReviewsDto {
	productId: string;
	rating: number;
	text: string;
}
