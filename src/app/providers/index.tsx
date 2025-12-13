import { ModeProvider } from "./ModeProvider";
import { RouterAppProvider } from "./RouterAppProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TanStackProvider } from "./TanStackProvider";
import { StateManagerProvider } from "./StateManagerProvider";

export function createProviderApp() {
	return (
		<ModeProvider>
			<ThemeProvider>
				<TanStackProvider>
					<StateManagerProvider>
						<RouterAppProvider />
					</StateManagerProvider>
				</TanStackProvider>
			</ThemeProvider>
		</ModeProvider>
	);
}
