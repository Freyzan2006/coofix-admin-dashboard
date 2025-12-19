import { ModeProvider } from "./ModeProvider";
import { RouterAppProvider } from "./RouterAppProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TanStackProvider } from "./TanStackProvider";
import { StateManagerProvider } from "./StateManagerProvider";
import { AuthProvider } from "@modules/auth";

export function createProviderApp() {
	return (
		<ModeProvider>
			<ThemeProvider>
				<TanStackProvider>
					<StateManagerProvider>
						<AuthProvider>
							<RouterAppProvider />
						</AuthProvider>
					</StateManagerProvider>
				</TanStackProvider>
			</ThemeProvider>
		</ModeProvider>
	);
}
