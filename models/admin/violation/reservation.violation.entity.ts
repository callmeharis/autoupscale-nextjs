import * as yup from "yup";
import { ViolationEntity } from "./violation.entity";
export class ReservationViolationEntity {
    constructor() { }
    id?: number;
    violation_id?: number;
    reservation_id?: number;
    fine_amount?: number;
    comment?: string;
    violation_at?: string;
    violation?: ViolationEntity;

    static yupSchema() {
        return yup.object({
            violation_id: yup.number().required('Violation is required').nullable(),
            //reservation_id: yup.number().required('Reservation is required').nullable(),
            comment: yup.string().nullable(),
            fine_amount: yup.number().positive('Fine can not be negative').required('Fine amount is required').nullable(),
        })
    }

}
