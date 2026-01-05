import { Mapper } from "@shared/abstract";
import type { CharacteristicsDto } from "./product.dto";
import type { CharacteristicsModel } from "./product.model";

export class ProductCharacteristicsMapper extends Mapper<
	CharacteristicsDto,
	CharacteristicsModel[]
> {
	public toDto(model: CharacteristicsModel[]): CharacteristicsDto {
		return model.reduce<Record<string, string>>((acc, { name, value }) => {
			if (name) acc[name] = value;
			return acc;
		}, {});
	}

	public toModel(dto: CharacteristicsDto): CharacteristicsModel[] {
		return Object.entries(dto).map(([name, value]) => ({
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
