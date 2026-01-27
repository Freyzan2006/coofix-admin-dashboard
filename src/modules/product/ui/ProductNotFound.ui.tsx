import { PackageIcon } from "lucide-react";

export const ProductNotFound: React.FC = () => {
	return (
		<div className="rounded-xl border bg-card p-10 text-center">
			<PackageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
			<h3 className="text-lg font-medium">Нет продуктов</h3>
			<p className="text-muted-foreground mt-1">
				Добавьте новые товары в каталог
			</p>
		</div>
	);
};
