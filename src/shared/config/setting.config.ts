import environmentConfig, {
	type IEnvironmentConfig,
} from "./environment.config";

type Mode = "dev" | "prod";

class SettingConfig {
	constructor(private readonly env: IEnvironmentConfig) {}

	public mode(): Mode {
		return this.env.get("VITE_MODE_APP") as Mode;
	}
}

export default new SettingConfig(environmentConfig);
