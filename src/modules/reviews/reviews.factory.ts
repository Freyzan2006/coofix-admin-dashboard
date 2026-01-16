import { newRestApiCli } from "@shared/api/rest-api/client";
import { type IReviewsApi, ReviewsRestApi } from "./reviews.api";

async function factoryReviewsApi(): Promise<IReviewsApi> {
	const client = await newRestApiCli();
	return new ReviewsRestApi(client);
}

const reviewsApi = await factoryReviewsApi();

export { reviewsApi };
