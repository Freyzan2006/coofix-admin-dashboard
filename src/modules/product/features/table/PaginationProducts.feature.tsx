import { Pagination } from "@shared/ui/Pagination.ui";
import { Space } from "@shared/ui/Space.ui";

import { useProductsAdapter } from "../../adapters/use-products.adapter";

export const PaginationProducts: React.FC = () => {
	const { total, currentPage, handlerPageChange, limit } = useProductsAdapter();

	const totalPages = Math.ceil(total / limit) || 1;

	return (
		<Space align="start" justify="between" gap={3}>
			{totalPages > 1 && (
				<Pagination
					current={currentPage}
					total={totalPages}
					onChange={handlerPageChange}
				/>
			)}
		</Space>
	);
};
