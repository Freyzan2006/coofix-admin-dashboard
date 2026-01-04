type CharacteristicItem = {
	name: string;
	value: string;
};

export interface CreateProductModel {
	name: string;
	description: string;
	price: number;
	oldPrice: number;
	category: string;
	brand: string;
	images: File[];
	characteristics: CharacteristicItem[];
	quantity: number;
	isNew: boolean;
	isSale: boolean;
}
