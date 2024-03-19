import * as yup from "yup";
export class VehicleGroupEntity {
    constructor() { }
    id?: number;
    name: string;

    static yupSchema() {
        return yup.object({
            id: yup.number().required().nullable(),
            name: yup.string().required().nullable()
        })
    }

}
