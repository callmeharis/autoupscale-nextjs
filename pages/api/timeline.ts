import BaseApi from "./_baseApi";
import { ReservationEntity } from "../../models/admin/reservation.entity";
import { GetReservationOptions } from '../../types/get-reservation-option.type';
export default class TimelineApi extends BaseApi {
    private baseUrl: string = "timeline";

    constructor() {
        super();
    }

    async list(options?: GetReservationOptions): Promise<ReservationEntity[]> {
        const {
            data: { data },
        } = await this.get(`${this.baseUrl}${this.buildQueryString(options)}`);

        return data;
    }
}
