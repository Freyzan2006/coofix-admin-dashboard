import type { ProductModel } from "@modules/product/model/product.model";

interface IEditProductFormProps {
	product: ProductModel;
}

export const EditProductForm: React.FC<IEditProductFormProps> = ({
	product,
}) => {
	return <div>Edit Product Form: {product.name}</div>;
};
