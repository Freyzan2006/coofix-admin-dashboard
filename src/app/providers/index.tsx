import { ModeProvider } from "./ModeProvider";
import { RouterAppProvider } from "./RouterAppProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TanStackProvider } from "./TanStackProvider";

export function createProviderApp() {
	return (
		<ModeProvider>
			<ThemeProvider>
				<TanStackProvider>
					<RouterAppProvider />
				</TanStackProvider>
			</ThemeProvider>
		</ModeProvider>
	);
}
