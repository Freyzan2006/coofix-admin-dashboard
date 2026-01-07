interface IUploadedEffectsProps {
	isDragging: boolean;
	uploadSuccess: boolean;
}

export const UploadedEffects: React.FC<IUploadedEffectsProps> = ({
	isDragging,
	uploadSuccess,
}) => {
	return (
		<>
			{/* Эффект пульсации при dragging */}
			{isDragging && (
				<>
					<div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
					<div
						className="absolute inset-4 border-4 border-primary/20 rounded-lg"
						style={{
							animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
						}}
					/>
				</>
			)}

			{/* Эффект успешной загрузки */}
			{uploadSuccess && (
				<div
					className="absolute inset-0 bg-success/5"
					style={{
						animation: "fadeOut 2s ease-out forwards",
					}}
				/>
			)}
		</>
	);
};
