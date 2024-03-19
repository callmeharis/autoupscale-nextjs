import BaseApi from "./_baseApi";
import { ReservationEntity } from "../../models/admin/reservation.entity";
import { GetReservationOptions } from '../../types/get-reservation-option.type';
export default class ReservationApi extends BaseApi {
    private baseUrl: string = "reserve";

    constructor() {
        super();
    }

    async list(options?: GetReservationOptions): Promise<ReservationEntity[]> {
        const {
            data: { data },
        } = await this.get(`${this.baseUrl}${this.buildQueryString(options)}`);

        return data;
    }

    async getById(reservationId: number): Promise<ReservationEntity> {
        const {
            data: { data },
        } = await this.get(`${this.baseUrl}/${reservationId}`);

        return data;
    }

    async create(dto: ReservationEntity): Promise<ReservationEntity> {
        const {
            data: { data },
        } = await this.post(`${this.baseUrl}`, dto);
        return data;
    }

    async update(
        reservationId: number,
        dto: ReservationEntity
    ): Promise<ReservationEntity> {
        const {
            data: { data },
        } = await this.post(`${this.baseUrl}/${reservationId}/update`, dto);
        return data;
    }
    async remove(reservationId: number): Promise<void> {
        const {
            data: { data },
        } = await this.delete(`${this.baseUrl}/${reservationId}`);
        return data;
    }
    // to download pdf
    async downloadInvoice(reservationId: number): Promise<any> {
        const { data } = await this.get(
            `${this.baseUrl}/${reservationId}/download`,
            {
                responseType: "blob"
            }
        );
        return data;

    }
    async startReservation(dto: ReservationEntity): Promise<ReservationEntity> {
        const {
            data: { data },
        } = await this.put(`start-reservation`, dto);

        return data;
    }
    async completeReservation(dto: ReservationEntity): Promise<ReservationEntity> {
        const { data: { data } } = await this.put(`/complete-reservation`, dto);

        return data;
    }

    async cancelReservation(dto: ReservationEntity): Promise<ReservationEntity> {
        const { data: { data } } = await this.put(`/cancel-reservation`, dto);

        return data;
    }

    async downloadContract(reservationId: number): Promise<any> {
        const { data } = await this.get(
            `${this.baseUrl}/${reservationId}/download-contract`,
            {
                responseType: "blob"
            }
        );
        return data;
    }
}
