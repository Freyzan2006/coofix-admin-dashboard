import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

export type FormRules<T extends FieldValues> = {
	[K in Path<T>]?: RegisterOptions<T, K>;
};
