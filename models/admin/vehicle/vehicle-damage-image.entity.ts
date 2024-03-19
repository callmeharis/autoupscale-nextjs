import * as yup from "yup";

import { VehicleEntity } from './vehicle.entity';

export class VehicleDamageImage {
    constructor() { }
    id?: number;
    image?: string;
    created_at?: string;
    updated_at?: string;

    vehicle?: VehicleEntity[];

    static yupSchema() {
        return yup.object({})
    }

}
