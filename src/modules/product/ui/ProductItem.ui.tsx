import { Button } from "@shared/ui/Button.ui";
import { ListItem } from "@shared/ui/list";
import { Label, SliceText } from "@shared/ui/text";
import { InfoIcon } from "lucide-react";
import type { ProductModel } from "../product.model";
import { useProductActionsStore } from "../store/product-actions.store";

interface IProductItemProps {
	product: ProductModel;
}

export const ProductItem: React.FC<IProductItemProps> = ({ product }) => {
	const { openModal } = useProductActionsStore();

	return (
		<ListItem>
			<Label>
				<SliceText text={product.name} slice={20} />
			</Label>
			<Button onClick={() => openModal(product, "details")}>
				<InfoIcon />
			</Button>
		</ListItem>
	);
};
