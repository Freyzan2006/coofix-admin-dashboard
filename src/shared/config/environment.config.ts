import { EnvVarNotFoundException } from "@shared/exceptions/env.exception";

export interface IEnvironmentConfig {
	get<T>(key: string): T;
	getArray<T>(key: string): T[];
}

class EnvironmentConfig implements IEnvironmentConfig {
	private readonly env: Record<string, string>;
	constructor() {
		this.env = import.meta.env;
	}

	public get<T>(key: string): T {
		const value = this.env[key];
		if (!value) {
			throw new EnvVarNotFoundException(key);
		}
		return value as T;
	}

	public getArray<T>(key: string): T[] {
		const value = this.env[key];
		if (!value) {
			throw new EnvVarNotFoundException(key);
		}
		return value.split(",") as T[];
	}
}

export default new EnvironmentConfig();
