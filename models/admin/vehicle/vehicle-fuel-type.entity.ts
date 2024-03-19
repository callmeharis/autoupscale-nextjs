import * as yup from "yup";

import { VehicleEntity } from './vehicle.entity';

export class VehicleFuelTypeEntity {
    constructor() { }
    id?: number;
    name?: string;

    vehicle?: VehicleEntity[];

    static yupSchema() {
        return yup.object({
            id: yup.number().required().nullable(),
            name: yup.string().required().nullable()
        })
    }

}
