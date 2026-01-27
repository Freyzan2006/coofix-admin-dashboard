import { HammerIcon } from "lucide-react";
import { NavLink } from "react-router";

export const ToDevTools: React.FC = () => {
	return (
		<NavLink
			className="fixed z-50 bottom-4 right-4 bg-secondary p-5 rounded-full"
			to="/devtools"
		>
			<HammerIcon />
		</NavLink>
	);
};
