import { useQuery } from "@tanstack/react-query";
import { userApi } from "../user.factory";

/*
Получение профиля пользователя. Через accessToken(Header Bearer)
*/
export function useProfileAdapter() {
	const { data, isLoading, error, isError } = useQuery({
		queryKey: ["user"],
		queryFn: async () => await userApi.profile(),
	});

	return {
		profile: data?.user,
		isLoading,
		error,
		isError,
	};
}
