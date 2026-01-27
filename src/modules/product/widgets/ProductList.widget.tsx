"use client";

import type { ProductModel } from "@modules/product/product.model";
import { useProductActionsStore } from "@modules/product/store/product-actions.store";
import { getUniqueId } from "@shared/lib/get-unique-id.lib";
import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/Badge.ui";
import { Button } from "@shared/ui/Button.ui";
import { Card } from "@shared/ui/Card.ui";
import { Skeleton } from "@shared/ui/Skeleton.ui";
import {
	AlertCircle,
	Calendar,
	ChevronRight,
	Edit3Icon,
	EyeIcon,
	PackageIcon,
	ShoppingBag,
	Star,
	Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { ProductNotFound } from "../ui/ProductNotFound.ui";

interface ProductListProps {
	products: ProductModel[];
	isError: boolean;
	isLoading: boolean;
	error: Error | null;
	limit: number;
}

export function ProductList({
	products,
	isError,
	isLoading,
	error,
	limit,
}: ProductListProps) {
	const { openModal } = useProductActionsStore();

	if (isError) {
		return (
			<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center text-destructive">
				<AlertCircle className="mx-auto h-10 w-10 mb-3" />
				<p className="font-medium">
					{error?.message || "Ошибка загрузки продуктов"}
				</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="space-y-4 w-full">
				{Array.from({ length: limit || 5 }).map((_, i) => (
					<Skeleton
						key={getUniqueId(String(i))}
						className="h-28 w-full rounded-xl"
					/>
				))}
			</div>
		);
	}

	if (products.length === 0) {
		return <ProductNotFound />;
	}

	return (
		<div className="space-y-3">
			{products.map((product, index) => (
				<motion.div
					key={product._id}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.05 }}
				>
					<Card
						className={cn(
							"group overflow-hidden transition-all hover:shadow-md hover:border-primary/50 cursor-pointer",
							"border bg-card",
						)}
						onClick={() => openModal(product, "details")}
					>
						<div className="p-0">
							<div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
								{/* Изображение (если есть) */}
								<div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
									{product.images && product.images.length > 0 ? (
										<img
											src={product.images[0].url}
											alt={product.name}
											className="h-full w-full object-cover transition-transform group-hover:scale-105"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center bg-muted/50">
											<PackageIcon className="h-10 w-10 text-muted-foreground/50" />
										</div>
									)}

									{/* Бейджи на изображении */}
									{product.isNew && (
										<Badge variant="accent" className="absolute top-2 left-2 ">
											Новинка
										</Badge>
									)}
									{product.isSale && (
										<Badge
											variant="success"
											className="absolute bottom-2 right-2 "
										>
											Скидка
										</Badge>
									)}
								</div>

								{/* Основная информация */}
								<div className="flex-1 min-w-0 space-y-2">
									<div className="flex items-start justify-between gap-4">
										<div>
											<h3 className="font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
												{product.name}
											</h3>
											<p className="text-sm text-muted-foreground mt-1 line-clamp-1">
												{product.description || "Без описания"}
											</p>
										</div>
										<div className="text-right">
											<div className="text-lg font-bold text-primary">
												{product.price} ₽
											</div>
											{product.oldPrice && product.oldPrice > product.price && (
												<div className="text-sm text-muted-foreground line-through">
													{product.oldPrice} ₽
												</div>
											)}
										</div>
									</div>

									{/* Метаданные */}
									<div className="flex flex-wrap gap-3 text-sm">
										<div className="flex items-center gap-1.5 text-muted-foreground">
											<Tag className="h-4 w-4" />
											<span>{product.category?.name || "Без категории"}</span>
										</div>

										<div className="flex items-center gap-1.5 text-muted-foreground">
											<Edit3Icon className="h-4 w-4" />
											<span>{product.brand?.name || "Без бренда"}</span>
										</div>

										<div className="flex items-center gap-1.5">
											<Star
												className={cn(
													"h-4 w-4",
													product.ratingAvg > 0
														? "text-yellow-500 fill-yellow-500"
														: "text-muted-foreground",
												)}
											/>
											<span className="font-medium">
												{product.ratingAvg?.toFixed(1) || "0.0"}
											</span>
											<span className="text-muted-foreground">
												({product.ratingCount || 0})
											</span>
										</div>

										<div className="flex items-center gap-1.5">
											<ShoppingBag className="h-4 w-4" />
											<span
												className={
													product.inStock ? "text-emerald-600" : "text-rose-600"
												}
											>
												{product.inStock ? "В наличии" : "Нет в наличии"}
											</span>
										</div>

										<div className="flex items-center gap-1.5 text-muted-foreground">
											<Calendar className="h-4 w-4" />
											<span>
												{new Date(product.createdAt).toLocaleDateString(
													"ru-RU",
												)}
											</span>
										</div>
									</div>
								</div>

								{/* Действия */}
								<div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
									<Button
										variant="ghost"
										onClick={(e) => {
											e.stopPropagation();
											openModal(product, "edit");
										}}
									>
										<Edit3Icon className="h-4 w-4" />
									</Button>

									<Button
										variant="ghost"
										onClick={(e) => {
											e.stopPropagation();
											openModal(product, "details");
										}}
									>
										<EyeIcon className="h-4 w-4" />
									</Button>

									<ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
								</div>
							</div>
						</div>
					</Card>
				</motion.div>
			))}
		</div>
	);
}
