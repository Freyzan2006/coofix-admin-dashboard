import { queryClient } from "@shared/api/tanstack-query";
import { toast } from "@shared/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { brandService } from "../di/brand.di";

export function useDeleteBrand() {
	const { mutate, mutateAsync, isPending, isError } = useMutation({
		mutationFn: async (id: string) => await brandService.deleteBrand(id),
		onSuccess: () => {
			toast.success("Бренд успешно удален");
			queryClient.invalidateQueries({ queryKey: ["brands"] });
		},
		onError: () => {
			toast.error("Произошла ошибка при удалении бренда");
		},
	});

	return {
		deleteBrand: mutate,
		deleteBrandAsync: mutateAsync,
		isPendingBrand: isPending,
		isErrorBrand: isError,
	};
}
