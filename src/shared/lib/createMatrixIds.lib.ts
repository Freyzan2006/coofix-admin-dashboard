export const createMatrixIds = (rows: number, cols: number) => {
	const rowIds = Array.from({ length: rows }, () => crypto.randomUUID());
	const colIds = Array.from({ length: cols }, () => crypto.randomUUID());

	return { rowIds, colIds };
};
