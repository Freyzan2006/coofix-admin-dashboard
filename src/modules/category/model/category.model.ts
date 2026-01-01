export interface CategoryModel {
	_id: string;
	name: string;
	slug: string;
	parent: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}
