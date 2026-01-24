import { Button } from "@shared/ui/Button.ui";
import { ArrowLeftIcon, FrownIcon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-4">
			<div className="text-center space-y-8 max-w-2xl mx-auto">
				{/* Большая 404 */}
				<div className="relative">
					<h1 className="text-[12rem] md:text-[18rem] font-black leading-none text-base-content/10 select-none">
						404
					</h1>

					{/* Оверлей с градиентом и текстом */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="space-y-4">
							<h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
								Страница не найдена
							</h2>
							<p className="text-lg md:text-xl text-base-content/70 max-w-lg mx-auto">
								Кажется, вы зашли туда, куда даже мы не заходили…
							</p>
						</div>
					</div>
				</div>

				<div className="flex justify-center my-8">
					<div className="text-8xl md:text-9xl animate-bounce-slow">
						<FrownIcon className="w-24 h-24" />
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						size="lg"
						variant="primary"
						className="gap-2 min-w-[180px]"
						onClick={() => navigate("/dashboard/analytics")}
					>
						<HomeIcon size={18} />
						На главную
					</Button>

					<Button
						size="lg"
						variant="outline"
						className="gap-2 min-w-[180px]"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon size={18} />
						Назад
					</Button>
				</div>

				{/* Дополнительная информация / юмор */}
				<div className="mt-12 text-sm text-base-content/50">
					<p>
						Код ошибки:{" "}
						<span className="font-mono text-primary">404_PAGE_GONE</span>
					</p>
				</div>
			</div>
		</div>
	);
}
