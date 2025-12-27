import type { ProductModel } from "../model/product.model";

interface IDeleteConfirmationProps {
	product: ProductModel;
	onConfirm: () => void;
}

export const DeleteConfirmation: React.FC<IDeleteConfirmationProps> = ({
	product,
	onConfirm,
}) => (
	<div>
		<p>
			Are you sure you want to delete <strong>{product.name}</strong>?
		</p>
		<button type="button" onClick={onConfirm} className="btn btn-danger mt-2">
			Confirm Delete
		</button>
	</div>
);
