import { useProductsViewAdapter } from "@modules/product";

import { Pagination } from "@shared/ui/Pagination.ui";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { MessageSquareDiffIcon } from "lucide-react";

export const PaginationReviews: React.FC = () => {
	// const { total, currentPage, handlerPageChange, limit } = useProductsAdapter();
	const { total, currentPage, handlerPageChange, limit } =
		useProductsViewAdapter();

	const totalPages = Math.ceil(total / limit) || 1;

	return (
		<Space align="center" justify="between" gap={3}>
			<Space align="center" gap={3}>
				<MessageSquareDiffIcon />
				<Heading>Таблица с Отзывами о товарах</Heading>
			</Space>
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
