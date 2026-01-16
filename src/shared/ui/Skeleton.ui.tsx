interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "primary" | "secondary";
}

export const Skeleton: React.FC<ISkeletonProps> = ({ variant = "primary" }) => {
	const renderPrimary = () => {
		return <div className="skeleton h-32 w-32"></div>;
	};

	const renderSecondary = () => {
		return (
			<div className="flex w-52 flex-col gap-4">
				<div className="skeleton h-32 w-full"></div>
				<div className="skeleton h-4 w-28"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="skeleton h-4 w-full"></div>
			</div>
		);
	};

	const variants = {
		primary: renderPrimary,
		secondary: renderSecondary,
	} as const;

	return variants[variant]();
};
