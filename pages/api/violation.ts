import { ViolationEntity } from "@/models/admin/violation/violation.entity";
import BaseApi from "./_baseApi";
import { GetVehiclesOptions } from "@/types/vehicle/get-vehicles-options.type";
import { GetViolationOptions } from "@/types/violation-options";

export default class ViolationApi extends BaseApi {
    private baseUrl: string = "violation";

    async list(
		options?: GetViolationOptions
	): Promise<ViolationEntity[]> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}${this.buildQueryString(options)}`
		);

		return data;
	}

    async create(dto: ViolationEntity): Promise<ViolationEntity> {
        const { data: { data } } = await this.post(`${this.baseUrl}`, dto);

        return data;
    }
    async update(reservationViolationId: number, dto: ViolationEntity): Promise<ViolationEntity> {
        const { data: { data } } = await this.put(
            `${this.baseUrl}/${reservationViolationId}`,
            dto
        );
        return data;
    }
    async getById(reservationViolationId: number): Promise<ViolationEntity> {
        const { data: { data } } = await this.get(
            `${this.baseUrl}/${reservationViolationId}`
        );

        return data;
    }
    async remove(violationId: number): Promise<void> {
		const { data: { data } } = await this.delete(
			`${this.baseUrl}/${violationId}`
		);

		return data;
	}
}