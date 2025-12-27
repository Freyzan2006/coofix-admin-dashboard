import {
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@shared/ui/modal";
import { AnimatePresence, motion } from "motion/react";
import { DeleteConfirmation } from "../features/DeleteConfirmation.feature";
import { DetailsProduct } from "../features/DetailsProduct.feature";
import { EditProductForm } from "../features/EditProductForm.feature";
import type { ProductModel } from "../model/product.model";
import { useProductActionsStore } from "../store/product-actions.store";

/**
 * Компонент для отображения modal с действиями над продуктом
 *
 * @returns React.FC
 */
export const ProductActions: React.FC = () => {
	const {
		isModalOpen,
		setIsModalOpen,
		selectedProduct,
		activeFrame,
		setActiveFrame,
		closeModal,
	} = useProductActionsStore();

	const handleDelete = (product: ProductModel) => {
		console.log("Deleting", product);
		// TODO: добавить логику удаления
	};

	return (
		<Modal controlledOpen={isModalOpen} onOpenChange={(v) => setIsModalOpen(v)}>
			<ModalContent size="lg">
				<ModalHeader
					title={selectedProduct ? selectedProduct.name : "Продукт"}
					description="Выберите действие"
				/>

				{/* Навигация между фреймами */}
				<div className="flex gap-2 mb-4">
					{(["details", "edit", "delete"] as const).map((frame) => (
						<button
							type="button"
							key={frame}
							className={`px-3 py-1 rounded ${activeFrame === frame ? "bg-primary text-white" : "bg-gray-200"}`}
							onClick={() => setActiveFrame(frame)}
						>
							{frame.toUpperCase()}
						</button>
					))}
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeFrame}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.2 }}
					>
						{activeFrame === "details" && selectedProduct && (
							<DetailsProduct product={selectedProduct} />
						)}
						{activeFrame === "edit" && selectedProduct && (
							<EditProductForm product={selectedProduct} />
						)}
						{activeFrame === "delete" && selectedProduct && (
							<DeleteConfirmation
								product={selectedProduct}
								onConfirm={() => {
									handleDelete(selectedProduct);
									closeModal();
								}}
							/>
						)}
					</motion.div>
				</AnimatePresence>

				<ModalFooter>
					<ModalClose>Закрыть</ModalClose>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
