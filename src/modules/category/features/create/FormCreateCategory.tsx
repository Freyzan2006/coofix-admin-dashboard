import { fieldsCategoryRules } from "@modules/category/config";

import { ImageDropzoneV2 } from "@modules/upload";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Input, Select } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { PlusIcon } from "lucide-react";

import { Controller, FormProvider } from "react-hook-form";
import { useFormCategoryCreate } from "./useForm";

export const FormCreateCategory: React.FC = () => {
	const { methods, onSubmit, isSubmitting, categories, images } =
		useFormCategoryCreate();

	return (
		<FormProvider {...methods}>
			<Form onSubmit={onSubmit} className="space-y-6">
				<Input
					placeholder="Название категории"
					{...methods.register("name", fieldsCategoryRules.name)}
					error={methods.formState.errors.name?.message}
					title="Название категории"
				/>

				<Controller
					control={methods.control}
					name="parent"
					rules={fieldsCategoryRules.parent}
					render={({ field }) => (
						<Select
							items={categories.data}
							value={field.value.name}
							onChange={field.onChange}
							error={methods.formState.errors.parent?.message}
							title="Подкатегория"
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
						variant="success"
						disabled={isSubmitting}
						className="w-full"
					>
						{isSubmitting ? (
							<Loading />
						) : (
							<>
								<PlusIcon /> Создать категорию
							</>
						)}
					</Button>
				</Space>
			</Form>
		</FormProvider>
	);
};
