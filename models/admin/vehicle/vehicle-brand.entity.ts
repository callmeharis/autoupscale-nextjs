import * as yup from "yup";
export class VehicleBrandEntity {
    constructor() { }
    id?: number;
    name?: string;
    vehicle_type_id?: number;
    static yupSchema() {
        return yup.object({
            name: yup.string().required("Brand is required.").nullable()
        })
    }

}
