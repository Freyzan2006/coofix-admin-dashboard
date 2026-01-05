import { Pagination } from "@shared/ui/Pagination.ui";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { PackageSearchIcon } from "lucide-react";
import { useProductsAdapter } from "../../adapters/useProducts.adapter";

export const PaginationProducts: React.FC = () => {
	const { total, currentPage, handlerPageChange, limit } = useProductsAdapter();

	const totalPages = Math.ceil(total / limit) || 1;

	return (
		<Space align="center" justify="between" gap={3}>
			<Space align="center" gap={3}>
				<PackageSearchIcon />
				<Heading>Таблица с продуктами</Heading>
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
