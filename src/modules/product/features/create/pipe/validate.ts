import type { CreateProductModel } from "@modules/product/model/create-product.model";

export async function isProductValidPipe(
	data: CreateProductModel,
): Promise<boolean> {
	const names = data.characteristics.map((c) => c.name.trim());

	if (new Set(names).size !== names.length) return false;

	return true;
}
