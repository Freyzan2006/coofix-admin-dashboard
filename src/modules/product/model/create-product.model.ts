type CharacteristicItem = {
	name: string;
	value: string;
};

// export type CharacteristicsType = {
// 	[key: string]: string;
// };

export interface CreateProductModel {
	name: string;
	description: string;
	price: number;
	oldPrice: number;
	category: string;
	brand: string;
	images: string[];
	characteristics: CharacteristicItem[];
	quantity: number;
	isNew: boolean;
	isSale: boolean;
}

