import * as yup from "yup";

export class VehicleModelEntity {
    constructor() { }
    id?: number;
    name?: string;
    brand_id?: number;

    static yupSchema() {
        return yup.object({
            //id: yup.number().required().nullable(),
            //brand_id: yup.number().required("Brand is required").nullable(),
            name: yup.string().required("Name field is required").nullable()
        })
    }

}
