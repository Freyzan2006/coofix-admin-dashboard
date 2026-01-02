export const getUniqueId = (seed: string) => {
	return crypto.randomUUID().replace(/-/g, seed);
};
