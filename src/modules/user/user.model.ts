import type { ProviderEntity } from "@modules/auth";

type RoleModel = "customer" | "admin";

export interface UserModel {
	_id: string;
	name: string;
	email: string;
	role: RoleModel;
	provider: ProviderEntity;
	createdAt: Date;
	updatedAt: Date;
}
