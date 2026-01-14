export interface ImageModel {
	url: string;
	publicId: string;
}

export interface ImagesResponseDto {
	success: boolean;
	images: ImageModel[];
}

export interface ImageResponseDto {
	success: boolean;
	image: ImageModel;
}
