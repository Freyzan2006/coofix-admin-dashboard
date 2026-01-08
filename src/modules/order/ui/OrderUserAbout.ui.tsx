import { DetailRow } from "@modules/common";
import type { UserModel } from "@modules/user";
import { Space } from "@shared/ui/Space.ui";
import { buildOrderUserDetails } from "../order.config";

interface IOrderUserAboutProps {
	user: UserModel;
}

export const OrderUserAbout: React.FC<IOrderUserAboutProps> = ({ user }) => {
	const details = buildOrderUserDetails(user);

	return (
		<Space axis="vertical" gap={2} fullWidth>
			{details.map(({ label, value }) => (
				<DetailRow key={label} label={label} value={value} />
			))}
		</Space>
	);
};
