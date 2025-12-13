import { footerLinks } from "@app/routing/config.routing";
import { LinkApp } from "@shared/ui/Link.ui";
import { useMemo } from "react";

export const Footer: React.FC = () => {
	const renderItems = useMemo(() => {
		return footerLinks.map(({ title, items }) => (
			<nav key={title} className="flex flex-col gap-3">
				<h6 className="footer-title">{title}</h6>
				{items.map(({ to, label }) => (
					<LinkApp key={`${to}-${label}`} to={to}>
						{label}
					</LinkApp>
				))}
			</nav>
		));
	}, []);

	return (
		<footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
			{renderItems}
		</footer>
	);
};
