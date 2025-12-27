import type { ProductModel } from "../model/product.model";

interface IDetailsProductProps {
	product: ProductModel;
}

export const DetailsProduct: React.FC<IDetailsProductProps> = ({ product }) => {
	return (
		<div>
			<h3 className="font-bold mb-2">Details</h3>
			<p>Name: {product.name}</p>
			<p>Price: {product.price}</p>
			<p>Description: {product.description}</p>
		</div>
	);
};
