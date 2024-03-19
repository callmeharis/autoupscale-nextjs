import { PermissionEntity } from "@/models/admin/company/permission.entity";
import BaseApi from "./_baseApi";
import { UserEntity } from "@/models/user/user.entity";
import { ManagerPermissions } from "@/components/company-setting/manager/permission";
import { ManagerPermissionDto } from "@/models/admin/company/manager-permission.dto";

export default class ManagerApi extends BaseApi {

	async create(dto: UserEntity): Promise<UserEntity> {
		const { data: { data } } = await this.post(
			`/manager`, dto
		);
		return data;
	};
	async list(): Promise<UserEntity[]> {
		const {
			data: { data },
		} = await this.get(`/manager`);

		return data;
	}
	async remove(managerId: number): Promise<void> {
		const { data: { data } } = await this.delete(
			`/manager/${managerId}`
		);

		return data;
	}
	async update(managerId: number, dto: UserEntity): Promise<UserEntity> {
		const { data: { data } } = await this.post(
			`/manager/${managerId}/update`,
			dto
		);
		return data;
	}
	async getById(managerId: number): Promise<UserEntity> {
		const { data: { data } } = await this.get(
			`/manager/${managerId}`
		);

		return data;
	}
	async getPermission() {
		const { data: { data } } = await this.get(
			`/permission`
		);

		return data;
	}
	async updatePermission(
		dto: PermissionEntity
	): Promise<PermissionEntity> {
		const { data: { data } } = await this.post(
			`/permission`,
			dto
		);
		return data;
	}
	async getPermissionById(
		permissionId: number,
	): Promise<ManagerPermissions> {
		const { data: { data } } = await this.get(
			`/permission/${permissionId}`
		);

		return data;
	}
}


