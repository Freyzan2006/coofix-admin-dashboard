import { ModeProvider } from "./ModeProvider";
import { RouterAppProvider } from "./RouterAppProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TanStackProvider } from "./TanStackProvider";
import { AuthProvider } from "@modules/auth";

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
