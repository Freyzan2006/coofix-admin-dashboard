import type { IToastApi } from "./features/toast";

export interface INotificationToastService {
	success: (message: string) => void;
	error: (message: string) => void;
	info: (message: string) => void;
}

export class NotificationToastService implements INotificationToastService {
	constructor(private readonly toast: IToastApi) {}

	public success(message: string) {
		this.toast.success(message);
	}
	public error(message: string) {
		this.toast.error(message);
	}
	public info(message: string) {
		this.toast.info(message);
	}
}
