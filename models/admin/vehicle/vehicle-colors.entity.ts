import * as yup from "yup";

import { VehicleEntity } from './vehicle.entity';

export class VehicleColorEntity {
    constructor() { }
    id?: number;
    color?: string;

    vehicle?: VehicleEntity[];

    static yupSchema() {
        return yup.object({
            id: yup.number().required().nullable(),
            color: yup.string().required().nullable()
        })
    }

}
