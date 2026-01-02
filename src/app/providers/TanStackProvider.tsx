import { queryClient } from "@shared/api/tanstack-query/client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export const TanStackProvider: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
