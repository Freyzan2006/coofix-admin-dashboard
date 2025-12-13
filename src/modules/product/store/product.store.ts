import { atom } from "@reatom/framework";

const pageAtom = atom(1, "pageAtom");
const limitAtom = atom(2, "limitAtom");
const headerTableAtom = atom(
	[
		"ID",
		"name",
		"slug",
		"description",
		"price",
		"oldPrice",
		"category",
		"brand",
		"images",
		"characteristics",
		"inStock",
		"quantity",
		"isNew",
		"isSale",
		"ratingAvg",
		"ratingCount",
		"createdAt",
	],
	"headerTableAtom",
);

export const ProductStore = {
	pageAtom,
	limitAtom,
	headerTableAtom,
};
