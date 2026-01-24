"use client";

import { environmentConfig } from "@shared/config";
import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Input } from "@shared/ui/fields";
import { LockIcon, MailIcon, UserCheckIcon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLoginLocal } from "../adapters/login.hook";
import type { LoginLocalDtoRequest } from "../api/dto/login.dto";
import { AUTH_REDIRECT } from "../auth.config";

export const LoginForm: React.FC = () => {
	const mode = environmentConfig.get<"development" | "prod">("MODE");
	const defaultEmail =
		mode === "development" ? "ilhomovabubakir12@gmail.com" : "";
	const defaultPassword = mode === "development" ? "admin" : "";

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginLocalDtoRequest>({
		defaultValues: {
			email: defaultEmail,
			password: defaultPassword,
		},
		mode: "onChange",
	});

	const {
		LoginLocal,
		errorLogin,
		isLoginError,
		isLoginPending,
		isLoginSuccess,
	} = useLoginLocal();

	const onSubmit: SubmitHandler<LoginLocalDtoRequest> = async (data) => {
		await LoginLocal(data);
		navigate(AUTH_REDIRECT, { replace: true });
	};

	return (
		<Form
			title="Вход в админ-панель"
			description="Введите свои данные для доступа к системе"
			variant="card"
			className="mx-auto"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="space-y-5">
				{/* Email */}
				<div className="relative">
					<MailIcon className="absolute left-3 top-1/2 z-1 -translate-y-1/2 h-5 w-5 text-base-content/50" />
					<Input
						type="email"
						placeholder="Ваш email"
						className="pl-11 input-bordered input-md w-full"
						error={errors.email?.message}
						{...register("email", {
							required: "Email обязателен",
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Некорректный email",
							},
						})}
					/>
				</div>

				{/* Password */}
				<div className="relative">
					<LockIcon className="absolute left-3 top-1/2 z-1 -translate-y-1/2 h-5 w-5 text-base-content/50" />
					<Input
						type="password"
						placeholder="Пароль"
						className="pl-11 input-bordered input-md w-full"
						error={errors.password?.message}
						{...register("password", {
							required: "Пароль обязателен",
							minLength: {
								value: 3,
								message: "Пароль должен быть минимум 3 символа",
							},
						})}
					/>
				</div>

				{/* Сообщения */}
				{isLoginError && (
					<Alert variant="danger" className="animate-shake">
						{errorLogin?.message || "Ошибка входа. Проверьте данные."}
					</Alert>
				)}

				{isLoginSuccess && (
					<Alert variant="success" className="animate-fade-in">
						Успешный вход! Перенаправляем...
					</Alert>
				)}
			</div>

			{/* Кнопка */}
			<Button
				type="submit"
				variant="primary"
				size="lg"
				className="w-full mt-6 gap-2 font-medium"
				loading={isLoginPending || isSubmitting}
				disabled={isLoginPending || isSubmitting}
			>
				<UserCheckIcon />
				Войти
			</Button>
		</Form>
	);
};
