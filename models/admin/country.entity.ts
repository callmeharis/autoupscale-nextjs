import * as yup from "yup";
export class CountryEntity {
    constructor() { }

    id?: number;
    name?: string;

    static yupSchema() {
        return yup.object({
            id: yup.number().nullable(),
            name: yup.string().nullable()
        })
    }

}
