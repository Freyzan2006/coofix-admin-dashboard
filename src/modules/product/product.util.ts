export function isPositiveNumber(value?: number): value is number {
	return typeof value === "number" && value > 0;
}
