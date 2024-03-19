import * as yup from "yup";
export class EmailExistanceCheckDto {
    email: string;
    type: number
    static yupSchema() {
        return yup.object({
            email: yup.string().email('Invalid Email Format').trim().required("Email is required").nullable(),
            type: yup.number().required().nullable()
        });
    }
}
