import { Button } from "./Button.ui";

interface IPaginationProps {
	current: number;
	total: number;
	onChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
	current,
	total,
	onChange,
}) => {
	return (
		<div className="join">
			{Array.from({ length: total }, (_, index) => index + 1).map((page) => (
				<Button
					onClick={() => onChange(page)}
					key={page}
					variant={current === page ? "ghost" : "primary"}
					className={current === page ? "join-item btn-active" : "join-item"}
				>
					{page}
				</Button>
			))}
		</div>
	);
};
