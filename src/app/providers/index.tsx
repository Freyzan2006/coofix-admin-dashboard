import { AuthProvider } from "@modules/auth";
import { ModeProvider } from "./ModeProvider";
import { RouterAppProvider } from "./RouterAppProvider";
import { TanStackProvider } from "./TanStackProvider";
import { ThemeProvider } from "./ThemeProvider";

export function createProviderApp() {
	return (
		<ModeProvider>
			<ThemeProvider>
				<TanStackProvider>
					<AuthProvider>
						<RouterAppProvider />
					</AuthProvider>
				</TanStackProvider>
			</ThemeProvider>
		</ModeProvider>
	);
}
