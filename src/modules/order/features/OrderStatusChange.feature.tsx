import { useOrderChangeStatus } from "@modules/order/adapters/use-change-order-status.hook";
import type { OrderDto, OrderStatus } from "@modules/order/order.dto";
import { Alert } from "@shared/ui/Alert.ui";
import { Button } from "@shared/ui/Button.ui";
import { Form } from "@shared/ui/Form.ui";
import { Select } from "@shared/ui/fields";
import { Loading } from "@shared/ui/Loading.ui";
import { Space } from "@shared/ui/Space.ui";
import { Heading } from "@shared/ui/text";
import { PenLineIcon } from "lucide-react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

interface IOrderStatusChangeProps {
	order: OrderDto;
}

interface FormValue {
	status: OrderStatus;
}

export const OrderStatusChange: React.FC<IOrderStatusChangeProps> = ({
	order,
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValue>({
		defaultValues: {
			status: order.status,
		},
	});

	const {
		changeStatusAsync,
		isErrorChangeStatus,
		isPendingChangeStatus,
		isSuccessChangeStatus,
	} = useOrderChangeStatus(order._id);

	const onSubmit: SubmitHandler<FormValue> = async (data: FormValue) => {
		await changeStatusAsync(data.status);
	};

	const statusForSelect: { label: string; value: OrderStatus }[] = [
		{
			label: "Отправлен",
			value: "shipped",
		},
		{
			label: "В ожидании",
			value: "pending",
		},
		{
			label: "Доставлен",
			value: "delivered",
		},
		{
			label: "Отменен",
			value: "canceled",
		},
	];

	return (
		<Space axis="vertical" gap={3}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Heading variant="secondary">Изменить статус заказа</Heading>
				<Controller
					control={control}
					name="status"
					render={({ field }) => (
						<Select
							title="Статус заказа"
							variant="accent"
							error={errors.status?.message}
							items={statusForSelect}
							onChange={field.onChange}
							value={field.value}
						/>
					)}
					rules={{
						required: "Выберите статус заказа",
					}}
					defaultValue={order.status}
				/>

				{isErrorChangeStatus && (
					<Alert variant="danger">
						Произошла ошибка при обновлении статуса
					</Alert>
				)}

				{isSuccessChangeStatus && (
					<Alert variant="success">Статус заказа успешно обновлен</Alert>
				)}

				<Button variant="warning" disabled={isPendingChangeStatus}>
					{isPendingChangeStatus ? (
						<Loading />
					) : (
						<>
							<PenLineIcon /> Обновить статус заказа
						</>
					)}
				</Button>
			</Form>
		</Space>
	);
};
