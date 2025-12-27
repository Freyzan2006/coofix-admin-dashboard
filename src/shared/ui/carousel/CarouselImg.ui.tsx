import { SquareChevronLeftIcon, SquareChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Paragraph } from "../text";

interface ICarouselImgProps {
	images: string[];
}

export const CarouselImg: React.FC<ICarouselImgProps> = ({ images }) => {
	const [currentImage, setCurrentImage] = useState(0);

	const nextImage = useMemo(() => {
		setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
	}, [images.length]);

	const prevImage = useMemo(() => {
		setCurrentImage(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		);
	}, [images.length]);

	const renderImages = useMemo(() => {
		return images.map((image, index) => (
			<div
				key={image}
				id={`slide${index + 1}`}
				className="carousel-item relative w-full"
			>
				<img alt={image} src={image} className="w-full" />
				<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
					<button
						type="button"
						onClick={() => prevImage}
						className="btn btn-circle"
					>
						<SquareChevronLeftIcon />
					</button>
					<button
						type="button"
						onClick={() => nextImage}
						className="btn btn-circle"
					>
						<SquareChevronRightIcon />
					</button>
				</div>
				<div className=" absolute top-4 right-4">
					<Paragraph size="lg" variant="primary">
						{currentImage + 1}/{images.length}
					</Paragraph>
				</div>
			</div>
		));
	}, [images, currentImage, nextImage, prevImage]);

	return <div className="carousel w-full">{renderImages}</div>;
};
