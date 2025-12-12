export const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
	children,
	...props
}) => {
	return <thead {...props}>{children}</thead>;
};
