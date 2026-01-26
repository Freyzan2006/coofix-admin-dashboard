import { Pagination } from "@shared/ui/Pagination.ui";
import { Space } from "@shared/ui/Space.ui";

import { useProductsViewAdapter } from "../../adapters/use-products-view.adapter";

export const PaginationProducts: React.FC = () => {
	// const { total, currentPage, handlerPageChange, limit } = useProductsAdapter();
	const { total, currentPage, handlerPageChange, limit } =
		useProductsViewAdapter();

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
