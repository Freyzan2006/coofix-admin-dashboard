import type { ProviderEntity } from "@modules/auth";

type RoleEntity = "customer" | "admin";

export interface UserEntity {
	_id: string;
	name: string;
	email: string;
	role: RoleEntity;
	provider: ProviderEntity;
	createdAt: Date;
	updatedAt: Date;
}
