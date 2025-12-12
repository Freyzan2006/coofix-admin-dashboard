export interface CategoryModel {
	_id: string;
	name: string;
	slug: string;
	parent: string;
	image: URL;
	createdAt: Date;
	updatedAt: Date;
}
