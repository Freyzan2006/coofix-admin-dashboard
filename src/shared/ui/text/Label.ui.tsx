export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
	children,
	htmlFor,
	...props
}) => {
	return (
		<label htmlFor={htmlFor} {...props} className="label">
			{children}
		</label>
	);
};
