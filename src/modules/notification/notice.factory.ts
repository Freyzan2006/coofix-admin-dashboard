import { toast } from "./features/toast";
import {
	type INotificationToastService,
	NotificationToastService,
} from "./notice.service";

async function factoryNotificationService(): Promise<INotificationToastService> {
	const svc = new NotificationToastService(toast);
	return svc;
}

export const noticeToastSvc = await factoryNotificationService();
