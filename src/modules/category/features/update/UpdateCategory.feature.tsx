import { useCategoryAdapter } from "@modules/category/adapters/useCategory.adapter.ts";
import { Alert } from "@shared/ui/Alert.ui";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { FormUpdateCategory } from "./FormUpdateCategory";

interface IEditCategoryFormProps {
	slug: string;
}

export const UpdateCategory: React.FC<IEditCategoryFormProps> = ({ slug }) => {
	const { category, categoryIsError, categoryIsLoading } =
		useCategoryAdapter(slug);

	if (categoryIsError) {
		return (
			<Space gap={3} align="center" justify="center">
				<Alert variant="danger">
					Произошла ошибка при загрузке категории. Попробуйте ещё раз потом
				</Alert>
			</Space>
		);
	}

	if (categoryIsLoading) {
		return (
			<Space gap={3} align="center" justify="center">
				<Loading />
			</Space>
		);
	}

	if (!category) {
		return (
			<Space gap={3} align="center" justify="center">
				<Alert variant="danger">
					Произошла ошибка при загрузке категории. Попробуйте ещё раз потом
				</Alert>
			</Space>
		);
	}

	return (
		<Space gap={3} align="center" justify="center">
			<FormUpdateCategory category={category} />
		</Space>
	);
};
