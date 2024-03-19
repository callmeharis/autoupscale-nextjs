import * as yup from "yup";
export class ViolationEntity {
    constructor() { }
    id?: number;
    name?: string;
    default_fine?: number;
    is_enabled?: number;

    static yupSchema() {
        return yup.object({
            name: yup.string().required('Name is required').nullable(),
            default_fine: yup.number().positive('Fine should be positive').nullable(),
            is_enabled: yup.number().nullable(),
        })
    }

}
