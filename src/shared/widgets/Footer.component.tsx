import { LinkApp } from "@shared/ui/Link.ui";

export const Footer: React.FC = () => {
	return (
		<footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
			<nav>
				<h6 className="footer-title">Services</h6>
				<LinkApp variant="primary" to="/" title="Home">
					Home
				</LinkApp>
				<LinkApp variant="secondary" to="/dashboard" title="Dashboard">
					Dashboard
				</LinkApp>
				<LinkApp variant="warning" to="/auth/login" title="Home">
					Login
				</LinkApp>
				<LinkApp variant="danger" to="/auth/register" title="Home">
					Register
				</LinkApp>
			</nav>
			<nav>
				<h6 className="footer-title">Company</h6>
			</nav>
			<nav>
				<h6 className="footer-title">Legal</h6>
			</nav>
		</footer>
	);
};
