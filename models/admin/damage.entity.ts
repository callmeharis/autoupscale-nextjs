import * as yup from "yup";
export class Damage {
    constructor() { }

    id?: number;
    name?: string;

    static yupSchema() {
        return yup.object({
            name: yup.string().nullable()
        })
    }

}
