export class EnvVarNotFoundException extends Error {
	constructor(variableName: string) {
		super(`Environment variable ${variableName} not found`);
		this.name = "EnvVarNotFoundException";
	}
}
