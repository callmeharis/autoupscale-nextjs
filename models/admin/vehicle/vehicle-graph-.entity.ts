import * as yup from "yup";
export class VehicleGraphEntity {
    constructor() { }

    reserved_vehicles?: number;
    available_vehicles?: number;
    all_vehicles?: number;

    static yupSchema() {
        return yup.object({
            reserved_vehicles: yup.number().nullable(),
            available_vehicles: yup.number().nullable(),
            all_vehicles: yup.number().nullable(),
        })
    }

}
