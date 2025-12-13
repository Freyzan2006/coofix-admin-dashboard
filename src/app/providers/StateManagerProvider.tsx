import type { PropsWithChildren } from "react";

import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";

const ctx = createCtx();

export const StateManagerProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<reatomContext.Provider value={ctx}>{children}</reatomContext.Provider>
	);
};
