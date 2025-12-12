export const createStableIds = (count: number): string[] => {
	return Array.from({ length: count }, () => crypto.randomUUID());
};
