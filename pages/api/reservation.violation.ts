import { ReservationViolationEntity } from "@/models/admin/violation/reservation.violation.entity";
import BaseApi from "./_baseApi";

export default class ReservationViolationApi extends BaseApi {
	private baseUrl: string = "reservation-violation";

	async create(reservationId: number, dto: ReservationViolationEntity): Promise<ReservationViolationEntity> {
		const { data: { data } } = await this.post(`reserve/${reservationId}/violation`, dto);

		return data;
	}

	async getById(reservationViolationId: number): Promise<ReservationViolationEntity> {
		const { data: { data } } = await this.get(
			`${this.baseUrl}/${reservationViolationId}`
		);

		return data;
	}

	async update(violationId: number, dto: ReservationViolationEntity): Promise<ReservationViolationEntity> {
		const { data: { data } } = await this.post(
			`${this.baseUrl}/${violationId}`,
			dto
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
