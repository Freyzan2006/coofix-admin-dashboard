import type { ProductModel } from "../model/product.model";

interface IDeleteConfirmationProps {
	product: ProductModel;
}

export const DeleteConfirmation: React.FC<IDeleteConfirmationProps> = ({
	product,
}) => (
	<div>
		<p>
			Are you sure you want to delete <strong>{product.name}</strong>?
		</p>
		<button
			type="button"
			onClick={() => console.log(product)}
			className="btn btn-danger mt-2"
		>
			Confirm Delete
		</button>
	</div>
);
