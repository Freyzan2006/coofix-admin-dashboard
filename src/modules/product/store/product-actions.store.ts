// // --- Modal state
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
// const [activeFrame, setActiveFrame] = useState<"details" | "edit" | "delete">("details");

// const openModal = (product: ProductModel, frame: typeof activeFrame = "details") => {
// 	setSelectedProduct(product);
// 	setActiveFrame(frame);
// 	setIsModalOpen(true);
// };

// const closeModal = () => setIsModalOpen(false);

import { create } from "zustand";
import type { ProductModel } from "../model/product.model";

const ProductActionsState = {
	isModalOpen: false,
	selectedProduct: null as ProductModel | null,
	activeFrame: "details" as "details" | "edit" | "delete",
};

interface ProductActionsStore {
	isModalOpen: boolean;
	selectedProduct: ProductModel | null;
	activeFrame: "details" | "edit" | "delete";
	openModal: (
		product: ProductModel,
		frame?: typeof ProductActionsState.activeFrame,
	) => void;
	closeModal: () => void;
	setIsModalOpen: (v: boolean) => void;
	setActiveFrame: (frame: "details" | "edit" | "delete") => void;
}

const useProductActionsStore = create<ProductActionsStore>((set) => ({
	...ProductActionsState,
	openModal: (
		product: ProductModel,
		frame: typeof ProductActionsState.activeFrame = "details",
	) => {
		set({ selectedProduct: product, activeFrame: frame, isModalOpen: true });
	},
	closeModal: () => set({ isModalOpen: false }),
	setIsModalOpen: (v: boolean) => set({ isModalOpen: v }),
	setActiveFrame: (frame: "details" | "edit" | "delete") =>
		set({ activeFrame: frame }),
}));

export { useProductActionsStore };
