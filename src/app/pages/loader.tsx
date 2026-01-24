import { Loading } from "@shared/ui/Loading.ui";

export const PageLoader: React.FC = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center min-h-screen">
			<Loading size="xl" />
		</div>
	);
};
