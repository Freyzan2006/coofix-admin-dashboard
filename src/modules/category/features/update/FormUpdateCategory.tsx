import type { CategoryModel } from "@modules/category/category.model";
import { fieldsCategoryRules } from "@modules/category/config";
import { ImageDropzoneV2 } from "@modules/upload/features/image-dropzone-v2";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Input, Select } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { PlusIcon } from "lucide-react";
import { Controller, FormProvider } from "react-hook-form";
import { useFormCategoryUpdate } from "./useForm";

interface IFormUpdateCategoryProps {
	category: CategoryModel;
}

export const FormUpdateCategory: React.FC<IFormUpdateCategoryProps> = ({
	category,
}) => {
	const { methods, onSubmit, isSubmitting, categories, images } =
		useFormCategoryUpdate(category);

	return (
		<FormProvider {...methods}>
			<Form onSubmit={onSubmit} className="space-y-6">
				<Input
					placeholder="Название категории"
					{...methods.register("name", fieldsCategoryRules.name)}
					error={methods.formState.errors.name?.message}
				/>

				<Controller
					control={methods.control}
					name="parent"
					rules={fieldsCategoryRules.parent}
					render={({ field }) => (
						<Select
							items={categories.data}
							value={field.value}
							onChange={field.onChange}
							error={methods.formState.errors.parent?.message}
						/>
					)}
				/>

				<ImageDropzoneV2
					images={images.field.value}
					onChange={images.field.onChange}
					maxFiles={images.maxFiles}
					minFiles={images.minFiles}
					required={images.required}
				/>

				<Space className="mt-6">
					<Button
						type="submit"
						variant="warning"
						disabled={isSubmitting}
						className="w-full"
					>
						{isSubmitting ? (
							<Loading />
						) : (
							<>
								<PlusIcon /> Обновить категорию
							</>
						)}
					</Button>
				</Space>
			</Form>
		</FormProvider>
	);
};
