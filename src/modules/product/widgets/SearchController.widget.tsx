import { Space } from "@shared/ui/Space.ui";
import { SearchProduct } from "../features/SearchProduct.feature";

export const SearchController: React.FC = () => {
	return (
		<Space justify="start" align="center" gap={4}>
			<SearchProduct />
		</Space>
	);
};
