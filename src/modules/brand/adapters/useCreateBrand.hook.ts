import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import type { CreateBrandDto } from "../api/brand.dto";
import { brandService } from "../di/brand.di";

export function useCreateBrand() {
	const { mutate, mutateAsync, isError, isPending, isSuccess } = useMutation({
		mutationFn: async (dto: CreateBrandDto) =>
			await brandService.createBrand(dto),
		onSuccess: () => {
			toast.success("Бренд успешно создан");
			queryClient.invalidateQueries({ queryKey: ["brands"] });
		},
		onError: () => {
			toast.error("Произошла ошибка при создании бренда");
		},
	});

	return {
		createBrand: mutate,
		createBrandAsync: mutateAsync,
		isErrorBrand: isError,
		isPendingBrand: isPending,
		isSuccessBrand: isSuccess,
	};
}
