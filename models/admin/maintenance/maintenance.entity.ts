import * as yup from "yup";
export class MaintenanceEntity {
    constructor() { }
    id?: number;
    name?: string;
    kms?: number;
    days?: number;
    static yupSchema() {
        return yup.object({
            name: yup.string().nullable(),
            kms: yup.number().nullable(),
            days: yup.number().nullable(),
        })
    }

}
