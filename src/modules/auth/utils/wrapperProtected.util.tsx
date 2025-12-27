import { lazy } from "react";
import { ProtectedRoute } from "../widgets/ProtectedRoute.widget";

export function wrapperProtected(
	importFn: () => Promise<{
		default: React.ComponentType<React.PropsWithChildren>;
	}>,
) {
	const LazyComponent = lazy(importFn);
	return () => (
		<ProtectedRoute>
			<LazyComponent />
		</ProtectedRoute>
	);
}
