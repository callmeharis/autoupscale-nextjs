import * as yup from "yup";
export class VehicleImage {
    constructor() { }
    id?: number;
    file_name?: string;



    static yupSchema() {
        return yup.object({})
    }

}
