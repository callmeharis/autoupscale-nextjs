import * as yup from "yup";
export class GarageEntity {
    constructor() { }
    id?: number;
    name?: string;
    email?: string;
    location?: string;

    static yupSchema() {
        return yup.object({
            name: yup.string().required('Name is required').nullable(),
            email: yup.string().email('Email is required').required().nullable(),
            location: yup.string().required('Location is required').nullable(),
        })
    }

}
