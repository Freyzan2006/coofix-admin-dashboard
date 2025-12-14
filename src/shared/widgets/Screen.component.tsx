import { PageLoader } from "@app/pages/loader";

import { Suspense, type PropsWithChildren } from "react";

export const Screen: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<Suspense fallback={<PageLoader />}>
			<div className="overflow-y-hidden">
				<div className="w-full flex flex-col min-h-screen">{children}</div>
			</div>
		</Suspense>
	);
};
