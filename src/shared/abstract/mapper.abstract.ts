export interface IMapper<D, M> {
	toDto(model: M): D;
	toModel(dto: D): M;
	toDtos(models: M[]): D[];
	toModels(dtos: D[]): M[];
}

export abstract class Mapper<D, M> implements IMapper<D, M> {
	public abstract toDto(model: M): D;
	public abstract toModel(dto: D): M;

	public toDtos(models: M[]): D[] {
		return models.map((item) => this.toDto(item));
	}

	public toModels(dtos: D[]): M[] {
		return dtos.map((item) => this.toModel(item));
	}
}
