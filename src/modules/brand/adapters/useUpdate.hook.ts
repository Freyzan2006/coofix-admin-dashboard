import type { UpdateData } from "@shared/api/tanstack-query";
import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import type { UpdateBrandDto } from "../api/brand.dto";
import { brandService } from "../di/brand.di";

export function useUpdateBrand() {
	const { mutate, mutateAsync, isPending, isError } = useMutation({
		mutationFn: async (data: UpdateData<UpdateBrandDto>) => {
			await brandService.updateBrand(data.id, data.dto);
		},
		onSuccess: () => {
			toast.success("Бренд успешно обновлен");
			queryClient.invalidateQueries({ queryKey: ["brands"] });
		},
		onError: () => {
			toast.error("Произошла ошибка при обновлении бренда");
		},
	});

	return {
		updateBrand: mutate,
		updateBrandAsync: mutateAsync,
		isPendingBrand: isPending,
		isErrorBrand: isError,
	};
}
