import { paths } from "@app/routing/paths.routing";
import { ModeProvider } from "./ModeProvider";
import { RouterAppProvider } from "./RouterAppProvider";
import { ThemeProvider } from "./ThemeProvider";

export function createProviderApp() {
	return (
		<ModeProvider>
			<ThemeProvider>
				<RouterAppProvider paths={paths} />
			</ThemeProvider>
		</ModeProvider>
	);
}
