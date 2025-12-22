import { LoginWidget } from "@modules/auth";
import { Space } from "@shared/ui/Space.ui";

export default function LoginPage() {
	return (
		<Space align="center" justify="center" fullYScreen>
			<LoginWidget />
		</Space>
	);
}
