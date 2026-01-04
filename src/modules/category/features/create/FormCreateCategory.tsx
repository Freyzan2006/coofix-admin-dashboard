import { fieldsCategoryRules } from "@modules/category/config";
import type { UploadedImage } from "@modules/upload";
import { ImageDropzone } from "@modules/upload";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Input, Select } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";
import { useFormCategoryCreate } from "./useForm";

export const FormCreateCategory: React.FC = () => {
	const { methods, onSubmit, isSubmitting, categories } =
		useFormCategoryCreate();

	const [images, setImages] = useState<UploadedImage[]>([]);

	const onChange = (images: UploadedImage[]) => {
		setImages(images);
	};

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

				<ImageDropzone images={images} onChange={onChange} maxFiles={1} />

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
