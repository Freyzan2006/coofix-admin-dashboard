import { getUniqueId } from "@shared/lib/get-unique-id.lib";
import { Paragraph } from "@shared/ui/text";
import { SquareChevronLeftIcon, SquareChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ICarouselImgProps {
	images: string[];
}

const DEFAULT_IMAGE = "/default-image.jpeg";

export const CarouselImg: React.FC<ICarouselImgProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const hasImages = images && images.length > 0;
	const displayImages = hasImages ? images : [DEFAULT_IMAGE];

	const infiniteImages = useMemo(() => {
		if (displayImages.length <= 1) return displayImages;
		return [...displayImages, displayImages[0]];
	}, [displayImages]);

	const nextImage = useCallback(() => {
		if (isTransitioning || displayImages.length <= 1) return;

		setIsTransitioning(true);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);

		setTimeout(() => setIsTransitioning(false), 500);
	}, [displayImages.length, isTransitioning]);

	const prevImage = useCallback(() => {
		if (isTransitioning || displayImages.length <= 1) return;

		setIsTransitioning(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1,
		);

		setTimeout(() => setIsTransitioning(false), 500);
	}, [displayImages.length, isTransitioning]);

	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		e.currentTarget.src = DEFAULT_IMAGE;
		e.currentTarget.alt = "Изображение не найдено";
	};

	useEffect(() => {
		if (displayImages.length <= 1) return;

		const interval = setInterval(() => {
			nextImage();
		}, 5000);

		return () => clearInterval(interval);
	}, [displayImages.length, nextImage]);

	useEffect(() => {
		if (!isTransitioning) return;

		const timer = setTimeout(() => {
			setIsTransitioning(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [isTransitioning]);

	const getTransform = () => {
		if (displayImages.length <= 1) return "translateX(0%)";
		return `translateX(-${currentIndex * 100}%)`;
	};

	return (
		<div className="relative w-full h-[400px] overflow-hidden">
			<div
				ref={containerRef}
				className="flex h-full transition-transform duration-500 ease-in-out"
				style={{
					transform: getTransform(),
					width: `${infiniteImages.length * 100}%`,
				}}
			>
				{infiniteImages.map((image, index) => (
					<div
						key={`${image}-${getUniqueId(image)}`}
						className="w-full h-full flex-shrink-0"
					>
						<img
							alt={`Product ${index + 1}`}
							src={image}
							onError={handleImageError}
							loading="lazy"
						/>
					</div>
				))}
			</div>

			{displayImages.length > 1 && (
				<>
					<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
						<button
							type="button"
							onClick={prevImage}
							className="btn btn-circle  hover:scale-110 transition-all"
							disabled={isTransitioning}
						>
							<SquareChevronLeftIcon />
						</button>
						<button
							type="button"
							onClick={nextImage}
							className="btn btn-circle hover:scale-110  transition-all"
							disabled={isTransitioning}
						>
							<SquareChevronRightIcon />
						</button>
					</div>

					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
						{displayImages.map((_, index) => (
							<button
								key={getUniqueId(index.toString())}
								type="button"
								onClick={() => {
									if (!isTransitioning) {
										setIsTransitioning(true);
										setCurrentIndex(index);
									}
								}}
								className={`w-3 h-3 rounded-full transition-all ${
									index === currentIndex
										? "bg-white scale-125"
										: "bg-white/50 hover:bg-white/70"
								}`}
								aria-label={`Go to slide ${index + 1}`}
								disabled={isTransitioning}
							/>
						))}
					</div>

					<div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full z-10">
						<Paragraph size="lg" variant="secondary">
							{currentIndex + 1}/{displayImages.length}
						</Paragraph>
					</div>
				</>
			)}
		</div>
	);
};
