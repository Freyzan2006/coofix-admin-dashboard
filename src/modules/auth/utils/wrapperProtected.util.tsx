import { lazy } from "react";
import { ProtectedRoute } from "../widgets/ProtectedRoute.widget";
import { PublicOnlyRoute } from "../widgets/PublicOnlyRoute.widget";

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


export function wrapperPublicOnly(
  importFn: () => Promise<{
    default: React.ComponentType;
  }>
) {
  const LazyComponent = lazy(importFn);

  return () => (
    <PublicOnlyRoute>
      <LazyComponent />
    </PublicOnlyRoute>
  );
}