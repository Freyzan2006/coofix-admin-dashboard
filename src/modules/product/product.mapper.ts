import type { CharacteristicsDto } from "./product.dto";
import type { CharacteristicsModel } from "./product.model";

export class ProductCharacteristicsMapper {
	public toDto(characteristics: CharacteristicsModel[]): CharacteristicsDto {
		return characteristics.reduce<Record<string, string>>(
			(acc, { name, value }) => {
				if (name) acc[name] = value;
				return acc;
			},
			{},
		);
	}

	public toModel(characteristics: CharacteristicsDto): CharacteristicsModel[] {
		return Object.entries(characteristics).map(([name, value]) => ({
			name,
			value,
		}));
	}
}

// export const arrayToRecord = (
//   items: CharacteristicsModel[]
// ): CharacteristicsDto =>
//   items.reduce<Record<string, string>>((acc, { name, value }) => {
//     if (name) acc[name] = value;
//     return acc;
//   }, {});

// const recordToArray = (
//   characteristics: CharacteristicsDto
// ): CharacteristicsModel[] =>
//   Object.entries(characteristics).map(([name, value]) => ({
//     name,
//     value,
//   }));
