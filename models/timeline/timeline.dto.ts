
import * as yup from "yup";
export class TimelineDto {
    constructor() { }
    vehicle_id?: number[];
    user_id?: number[];
    status?: string

    static timelineYupSchema() {
        return yup.object({
            vehicle_id: yup.array().of(yup.number()).nullable(),
            user_id: yup.number().positive().nullable(),
            status: yup.array().of(yup.number()).nullable(),
        })
    }
}
