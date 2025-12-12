import { Button } from "@shared/ui/Button.ui";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Image } from "@shared/ui/Image.ui";
import { Form } from "@shared/ui/Form.ui";

import type { LoginLocalDtoRequest } from "../api/dto/login.dto";

import { Alert } from "@shared/ui/Alert.ui";
import { useLoginLocal } from "../hooks/login.hook";
import { Input } from "@shared/ui/fields";

export const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginLocalDtoRequest>({
		defaultValues: {},
		mode: "onChange",
		criteriaMode: "firstError",
		reValidateMode: "onChange",
	});

	const {
		LoginLocal,
		errorLogin,
		isLoginError,
		isLoginPending,
		isLoginSuccess,
	} = useLoginLocal();

	const onSubmit: SubmitHandler<LoginLocalDtoRequest> = async (
		data: LoginLocalDtoRequest,
	) => await LoginLocal(data);

	return (
		<Form title="Вход" onSubmit={handleSubmit(onSubmit)}>
			<Input
				value={"Krasavchikxj@gmail.com"}
				error={errors.email?.message}
				title="Почта"
				variant="default"
				type="email"
				{...register("email", {
					required: "Email обязателен",
					pattern: {
						value: /^\S+@\S+$/i,
						message: "Некорректный email",
					},
				})}
			/>

			<Input
				value={"jasur"}
				error={errors.password?.message}
				variant="default"
				title="Пароль"
				type="password"
				{...register("password", {
					required: "Пароль обязателен",
					minLength: {
						value: 3,
						message: "Пароль должен быть минимум 3 символов",
					},
				})}
			/>

			{isLoginError && (
				<Alert variant="danger">
					<span>{errorLogin?.response?.data?.message || "Ошибка входа"}</span>
				</Alert>
			)}

			{isLoginSuccess && (
				<Alert variant="success">
					<span>Вход выполнен успешно!</span>
				</Alert>
			)}

			<Button variant="neutral" type="submit" loading={isLoginPending}>
				Войти
			</Button>
			<Button variant="ghost" loading={isLoginPending}>
				<Image src="/images/google.png" alt="Google" width={50} />
				Войти с помощью Google
			</Button>
		</Form>
	);
};
