import * as yup from "yup";

import { VehicleEntity } from '../vehicle/vehicle.entity';

export class CompanyInvestorsEntity {
    constructor() { }
    id?: number;
    email: string;
    first_name: string;
    last_name?: string;

    static yupSchema() {
        return yup.object({
            id: yup.number().required().nullable(),
            email: yup.string().required().nullable(),
            first_name: yup.string().required().nullable(),
            last_name: yup.string().required().nullable(),
        })
    }

}
