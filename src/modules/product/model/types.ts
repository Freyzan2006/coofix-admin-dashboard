export interface CharacteristicsModel {
	name: string;
	value: string;
}

// export interface CharacteristicsDto {
// 	[name: string]: string;
// }

export type CharacteristicsDto = Record<string, string>;
