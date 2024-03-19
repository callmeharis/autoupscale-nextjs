
import AuthApi from "../../pages/api/auth";
import { FormikInterface } from "../formik";
export interface BaseEmailCheckProps {
    form: FormikInterface<any>
    type: number
}
export async function emailExistanceCheck({ form, type }: BaseEmailCheckProps) {
    const api = new AuthApi();
    if (!form.errors.email) {
        const data = await api.public.create({
            type: type, // to check for company existance
            email: form.values.email
        })
        if (data?.is_exists) {
            form.setFieldError('email', "email already exists")
            form.setFieldTouched('email', true, false)
        }
    }

}

