import { Spinner } from "@shared/ui/Spinner.ui";

export const PageLoader: React.FC = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center min-h-screen">
			<Spinner size="xl" />
		</div>
	);
};
